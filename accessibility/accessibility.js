/* ===== SISTEMA DE ACESSIBILIDADE ===== */
class AccessibilityManager {
    constructor() {
        this.config = {
            fontSizes: ['small', 'normal', 'large', 'xlarge', 'xxlarge'],
            currentFontSize: 'normal',
            highContrast: false,
            visionMode: 'normal',
            reducedMotion: false,
            highlightLinks: false,
            enhancedFocus: false
        };

        this.visionModes = [
            { id: 'normal', label: 'Visão Normal', icon: 'fa-eye' },
            { id: 'deuteranopia', label: 'Deuteranopia (verde)', icon: 'fa-eye' },
            { id: 'protanopia', label: 'Protanopia (vermelho)', icon: 'fa-eye' },
            { id: 'tritanopia', label: 'Tritanopia (azul)', icon: 'fa-eye' },
            { id: 'achromatopsia', label: 'Acromatopsia (P&B)', icon: 'fa-adjust' }
        ];

        this.isPanelOpen = false;
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupElements();
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.announceReady();
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('planeta-accessibility-settings');
            if (saved) {
                const settings = JSON.parse(saved);
                this.config = { ...this.config, ...settings };
                this.applySettings();
            }
        } catch (error) {
            console.warn('Não foi possível carregar as configurações:', error);
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('planeta-accessibility-settings', JSON.stringify(this.config));
            this.showStatus('Configurações salvas');
        } catch (error) {
            console.warn('Não foi possível salvar as configurações:', error);
        }
    }

    applySettings() {
        this.applyFontSize();
        this.applyContrast();
        this.applyVision();
        this.applyMotion();
        this.applyFocus();
        this.applyLinks();
        this.updateButtonStates();
    }

    setupElements() {
        this.elements = {
            toggle: document.getElementById('accessibility-toggle'),
            panel: document.getElementById('accessibility-panel'),
            closePanel: document.getElementById('close-panel'),
            overlay: document.getElementById('panel-overlay'),
            decreaseFont: document.getElementById('decrease-font'),
            increaseFont: document.getElementById('increase-font'),
            resetFont: document.getElementById('reset-font'),
            currentFontSize: document.getElementById('current-font-size'),
            toggleContrast: document.getElementById('toggle-contrast'),
            colorblindMode: document.getElementById('colorblind-mode'),
            reducedMotion: document.getElementById('reduced-motion'),
            highlightLinks: document.getElementById('highlight-links'),
            focusHelper: document.getElementById('focus-helper'),
            keyboardShortcuts: document.getElementById('keyboard-shortcuts'),
            resetAll: document.getElementById('reset-all'),
            shortcutsModal: document.getElementById('shortcuts-modal'),
            closeShortcuts: document.getElementById('close-shortcuts'),
            statusMessage: document.getElementById('status-message')
        };
        
        this.validateElements();
    }

    validateElements() {
        const requiredElements = ['toggle', 'panel', 'overlay'];
        requiredElements.forEach(el => {
            if (!this.elements[el]) {
                console.warn(`Elemento ${el} não encontrado no DOM`);
            }
        });
    }

    setupEventListeners() {
        if (!this.elements.toggle) return;

        // Toggle do painel - CORREÇÃO PRINCIPAL
        this.elements.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (this.isPanelOpen) {
                this.closePanel();
            } else {
                this.openPanel();
            }
        });
        
        this.elements.toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (this.isPanelOpen) {
                    this.closePanel();
                } else {
                    this.openPanel();
                }
            }
        });

        // Fechar painel com botão X
        if (this.elements.closePanel) {
            this.elements.closePanel.addEventListener('click', (e) => {
                e.preventDefault();
                this.closePanel();
            });
        }
        
        // Fechar com overlay (clique fora)
        if (this.elements.overlay) {
            this.elements.overlay.addEventListener('click', (e) => {
                e.preventDefault();
                this.closePanel();
            });
        }

        // Controles de fonte
        if (this.elements.decreaseFont) {
            this.elements.decreaseFont.addEventListener('click', () => this.changeFontSize(-1));
        }
        if (this.elements.increaseFont) {
            this.elements.increaseFont.addEventListener('click', () => this.changeFontSize(1));
        }
        if (this.elements.resetFont) {
            this.elements.resetFont.addEventListener('click', () => this.resetFontSize());
        }

        // Controles de contraste
        if (this.elements.toggleContrast) {
            this.elements.toggleContrast.addEventListener('click', () => this.toggleContrast());
        }

        // Controles de visão
        if (this.elements.colorblindMode) {
            this.elements.colorblindMode.addEventListener('click', () => this.toggleVisionMode());
        }
        if (this.elements.reducedMotion) {
            this.elements.reducedMotion.addEventListener('click', () => this.toggleReducedMotion());
        }

        // Controles de leitura
        if (this.elements.highlightLinks) {
            this.elements.highlightLinks.addEventListener('click', () => this.toggleHighlightLinks());
        }

        // Controles de navegação
        if (this.elements.focusHelper) {
            this.elements.focusHelper.addEventListener('click', () => this.toggleEnhancedFocus());
        }

        // Controles de ajuda
        if (this.elements.keyboardShortcuts) {
            this.elements.keyboardShortcuts.addEventListener('click', () => this.showShortcutsModal());
        }
        if (this.elements.resetAll) {
            this.elements.resetAll.addEventListener('click', () => this.resetAllSettings());
        }

        // Modal
        if (this.elements.closeShortcuts) {
            this.elements.closeShortcuts.addEventListener('click', () => this.closeShortcutsModal());
        }

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.isPanelOpen) {
                    this.closePanel();
                }
                if (this.elements.shortcutsModal && this.elements.shortcutsModal.getAttribute('aria-hidden') === 'false') {
                    this.closeShortcutsModal();
                }
            }
        });

        window.addEventListener('beforeunload', () => this.saveSettings());
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key.toLowerCase() === 'a') {
                e.preventDefault();
                if (this.isPanelOpen) {
                    this.closePanel();
                } else {
                    this.openPanel();
                }
            }
            if (e.altKey && (e.key === '+' || e.key === '=')) {
                e.preventDefault();
                this.changeFontSize(1);
            }
            if (e.altKey && e.key === '-') {
                e.preventDefault();
                this.changeFontSize(-1);
            }
            if (e.altKey && e.key.toLowerCase() === 'c') {
                e.preventDefault();
                this.toggleContrast();
            }
            if (e.altKey && e.key.toLowerCase() === 'v') {
                e.preventDefault();
                this.toggleVisionMode();
            }
            if (e.altKey && e.key.toLowerCase() === 'r') {
                e.preventDefault();
                this.toggleReducedMotion();
            }
            if (e.altKey && e.key.toLowerCase() === 'f') {
                e.preventDefault();
                this.toggleEnhancedFocus();
            }
        });
    }

    /* Abre o painel */
    openPanel() {
        if (!this.elements.panel || !this.elements.overlay) return;

        this.isPanelOpen = true;
        
        this.elements.panel.setAttribute('aria-hidden', 'false');
        this.elements.overlay.setAttribute('aria-hidden', 'false');
        if (this.elements.toggle) {
            this.elements.toggle.setAttribute('aria-expanded', 'true');
        }
        
        this.announceToScreenReader('Painel de acessibilidade aberto');
        this.showStatus('Painel aberto');
    }

    /* Fecha o painel - CORREÇÃO PRINCIPAL */
    closePanel() {
        if (!this.elements.panel || !this.elements.overlay) return;

        this.isPanelOpen = false;
        
        this.elements.panel.setAttribute('aria-hidden', 'true');
        this.elements.overlay.setAttribute('aria-hidden', 'true');
        if (this.elements.toggle) {
            this.elements.toggle.setAttribute('aria-expanded', 'false');
        }
        
        // Restaurar completamente o scroll do body
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
        
        this.announceToScreenReader('Painel de acessibilidade fechado');
    }

    changeFontSize(direction) {
        const currentIndex = this.config.fontSizes.indexOf(this.config.currentFontSize);
        let newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < this.config.fontSizes.length) {
            this.config.currentFontSize = this.config.fontSizes[newIndex];
            this.applyFontSize();
            this.saveSettings();

            const message = `Tamanho da fonte ajustado para ${this.getFontSizeLabel()}`;
            this.announceToScreenReader(message);
            this.showStatus(message);
        } else {
            const message = direction > 0 ? 'Tamanho máximo atingido' : 'Tamanho mínimo atingido';
            this.showStatus(message);
        }
    }

    resetFontSize() {
        this.config.currentFontSize = 'normal';
        this.applyFontSize();
        this.saveSettings();
        this.announceToScreenReader('Tamanho da fonte restaurado para o padrão');
        this.showStatus('Fonte restaurada');
    }

    applyFontSize() {
        document.body.setAttribute('data-accessibility-fontsize', this.config.currentFontSize);
        if (this.elements.currentFontSize) {
            this.elements.currentFontSize.textContent = this.getFontSizeLabel();
        }
        
        const root = document.documentElement;
        const fontSizeMap = {
            'small': '14px',
            'normal': '16px',
            'large': '18px',
            'xlarge': '20px',
            'xxlarge': '24px'
        };
        root.style.fontSize = fontSizeMap[this.config.currentFontSize] || '16px';
    }

    getFontSizeLabel() {
        const labels = {
            'small': '85%',
            'normal': '100%',
            'large': '115%',
            'xlarge': '130%',
            'xxlarge': '150%'
        };
        return labels[this.config.currentFontSize] || '100%';
    }

    toggleContrast() {
        this.config.highContrast = !this.config.highContrast;
        this.applyContrast();
        this.saveSettings();

        const message = this.config.highContrast ?
            'Alto contraste ativado' : 'Alto contraste desativado';
        this.announceToScreenReader(message);
        this.showStatus(message);
        this.updateButtonStates();
    }

    applyContrast() {
        document.body.setAttribute('data-accessibility-contrast',
            this.config.highContrast ? 'high' : 'normal');
    }

    toggleVisionMode() {
        const currentMode = this.config.visionMode || 'normal';
        let nextMode = 'normal';

        switch (currentMode) {
            case 'normal': nextMode = 'deuteranopia'; break;
            case 'deuteranopia': nextMode = 'protanopia'; break;
            case 'protanopia': nextMode = 'tritanopia'; break;
            case 'tritanopia': nextMode = 'achromatopsia'; break;
            case 'achromatopsia': nextMode = 'normal'; break;
            default: nextMode = 'normal';
        }

        this.config.visionMode = nextMode;
        this.applyVision();
        this.saveSettings();

        const modeLabel = this.visionModes.find(m => m.id === nextMode).label;
        this.announceToScreenReader(`Modo ${modeLabel} ativado`);
        this.showStatus(`Visão: ${modeLabel}`);
        this.updateButtonStates();
    }

    applyVision() {
        const mode = this.config.visionMode || 'normal';

        document.body.removeAttribute('data-accessibility-vision');
        document.documentElement.style.filter = 'none';
        this.removeColorBlindFilters();

        if (mode !== 'normal') {
            document.body.setAttribute('data-accessibility-vision', mode);

            if (mode === 'achromatopsia') {
                document.documentElement.style.filter = 'grayscale(100%)';
            } else {
                this.applyColorBlindFilter(mode);
            }
        }
    }

    removeColorBlindFilters() {
        const filters = document.getElementById('colorblind-filters');
        if (filters) filters.remove();
    }

    applyColorBlindFilter(mode) {
        this.createColorBlindFilters();

        switch (mode) {
            case 'deuteranopia':
                document.documentElement.style.filter = 'url(#deuteranopia)';
                break;
            case 'protanopia':
                document.documentElement.style.filter = 'url(#protanopia)';
                break;
            case 'tritanopia':
                document.documentElement.style.filter = 'url(#tritanopia)';
                break;
        }
    }

    createColorBlindFilters() {
        if (document.getElementById('colorblind-filters')) return;

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("id", "colorblind-filters");
        svg.setAttribute("style", "position: absolute; width: 0; height: 0;");

        const filters = [
            { id: 'deuteranopia', matrix: '0.43 0.72 -0.15 0 0 0.34 0.57 0.09 0 0 -0.02 0.03 0.99 0 0 0 0 0 1 0' },
            { id: 'protanopia', matrix: '0.2 0.99 -0.19 0 0 0.16 0.79 0.05 0 0 0.01 0.01 0.98 0 0 0 0 0 1 0' },
            { id: 'tritanopia', matrix: '0.95 0.05 0 0 0 0 0.43 0.57 0 0 0 0.57 0.43 0 0 0 0 0 1 0' }
        ];

        filters.forEach(filter => {
            const filterEl = document.createElementNS(svgNS, "filter");
            filterEl.setAttribute("id", filter.id);
            filterEl.innerHTML = `<feColorMatrix type="matrix" values="${filter.matrix}"/>`;
            svg.appendChild(filterEl);
        });

        document.body.appendChild(svg);
    }

    toggleReducedMotion() {
        this.config.reducedMotion = !this.config.reducedMotion;
        this.applyMotion();
        this.saveSettings();

        const message = this.config.reducedMotion ?
            'Animações reduzidas' : 'Animações restauradas';
        this.announceToScreenReader(message);
        this.showStatus(message);
        this.updateButtonStates();
    }

    applyMotion() {
        document.body.setAttribute('data-accessibility-motion',
            this.config.reducedMotion ? 'reduced' : 'normal');
    }

    toggleHighlightLinks() {
        this.config.highlightLinks = !this.config.highlightLinks;
        this.applyLinks();
        this.saveSettings();

        const message = this.config.highlightLinks ?
            'Links destacados' : 'Links normais';
        this.announceToScreenReader(message);
        this.showStatus(message);
        this.updateButtonStates();
    }

    applyLinks() {
        document.body.setAttribute('data-accessibility-highlight-links',
            this.config.highlightLinks.toString());
    }

    toggleEnhancedFocus() {
        this.config.enhancedFocus = !this.config.enhancedFocus;
        this.applyFocus();
        this.saveSettings();

        const message = this.config.enhancedFocus ?
            'Foco aumentado ativado' : 'Foco aumentado desativado';
        this.announceToScreenReader(message);
        this.showStatus(message);
        this.updateButtonStates();
    }

    applyFocus() {
        document.body.setAttribute('data-accessibility-focus',
            this.config.enhancedFocus ? 'enhanced' : 'normal');
        
        const existingStyle = document.getElementById('enhanced-focus-styles');
        if (existingStyle) existingStyle.remove();
        
        if (this.config.enhancedFocus) {
            const style = document.createElement('style');
            style.id = 'enhanced-focus-styles';
            style.textContent = `
                *:focus-visible {
                    outline: 4px solid #FFD700 !important;
                    outline-offset: 4px !important;
                    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.3) !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    updateButtonStates() {
        if (this.elements.toggleContrast) {
            this.elements.toggleContrast.setAttribute('aria-pressed', this.config.highContrast);
            this.elements.toggleContrast.innerHTML = `<i class="fas fa-adjust" aria-hidden="true"></i><span>${this.config.highContrast ? 'Contraste Normal' : 'Alto Contraste'}</span>`;
        }
        
        if (this.elements.colorblindMode) {
            const currentMode = this.config.visionMode || 'normal';
            const modeLabel = this.visionModes.find(m => m.id === currentMode).label;
            const icon = currentMode === 'achromatopsia' ? 'fa-adjust' : 'fa-eye';
            
            this.elements.colorblindMode.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i><span>${modeLabel}</span>`;
            this.elements.colorblindMode.setAttribute('aria-pressed', currentMode !== 'normal');
        }
        
        if (this.elements.reducedMotion) {
            this.elements.reducedMotion.setAttribute('aria-pressed', this.config.reducedMotion);
            this.elements.reducedMotion.innerHTML = `<i class="fas fa-solid fa-walking" aria-hidden="true"></i><span>${this.config.reducedMotion ? 'Animações Normais' : 'Reduzir Animações'}</span>`;
        }
        
        if (this.elements.highlightLinks) {
            this.elements.highlightLinks.setAttribute('aria-pressed', this.config.highlightLinks);
            this.elements.highlightLinks.innerHTML = `<i class="fas fa-link" aria-hidden="true"></i><span>${this.config.highlightLinks ? 'Links Normais' : 'Destacar Links'}</span>`;
        }
        
        if (this.elements.focusHelper) {
            this.elements.focusHelper.setAttribute('aria-pressed', this.config.enhancedFocus);
            this.elements.focusHelper.innerHTML = `<i class="fas fa-regular fa-square" aria-hidden="true"></i><span>${this.config.enhancedFocus ? 'Foco Normal' : 'Foco Aumentado'}</span>`;
        }
    }

    showShortcutsModal() {
        if (!this.elements.shortcutsModal) return;

        this.elements.shortcutsModal.setAttribute('aria-hidden', 'false');
        if (this.elements.closeShortcuts) {
            this.elements.closeShortcuts.focus();
        }

        this.announceToScreenReader('Modal de atalhos de teclado aberto');
    }

    closeShortcutsModal() {
        if (!this.elements.shortcutsModal) return;

        this.elements.shortcutsModal.setAttribute('aria-hidden', 'true');
        if (this.elements.keyboardShortcuts) {
            this.elements.keyboardShortcuts.focus();
        }
    }

    resetAllSettings() {
        this.config = {
            fontSizes: ['small', 'normal', 'large', 'xlarge', 'xxlarge'],
            currentFontSize: 'normal',
            highContrast: false,
            visionMode: 'normal',
            reducedMotion: false,
            highlightLinks: false,
            enhancedFocus: false
        };

        this.applySettings();
        this.saveSettings();
        localStorage.removeItem('planeta-accessibility-settings');

        this.announceToScreenReader('Configurações restauradas para o padrão');
        this.showStatus('Configurações restauradas');
    }

    announceToScreenReader(message) {
        let announcer = document.getElementById('sr-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'sr-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only';
            document.body.appendChild(announcer);
        }
        announcer.textContent = message;
    }

    showStatus(message) {
        if (this.elements.statusMessage) {
            this.elements.statusMessage.textContent = message;
            setTimeout(() => {
                if (this.elements.statusMessage && this.elements.statusMessage.textContent === message) {
                    this.elements.statusMessage.textContent = 'Pronto';
                }
            }, 3000);
        }
    }

    announceReady() {
        setTimeout(() => {
            this.announceToScreenReader('Sistema de acessibilidade carregado. Pressione Alt + A para abrir o painel.');
        }, 1000);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    window.AccessibilityManager = new AccessibilityManager();
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityManager;
}