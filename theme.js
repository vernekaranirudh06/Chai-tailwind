// Theme Management
const THEME_KEY = 'chaicss-theme';

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'dark';
    setTheme(saved);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => setTheme(btn.dataset.theme));
    });
}

// Copy button
function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.closest('.code-block').querySelector('code')?.innerText || btn.closest('.code-block').innerText.replace('copy', '').trim();
            navigator.clipboard.writeText(code).then(() => {
                btn.textContent = 'copied!';
                setTimeout(() => btn.textContent = 'copy', 1500);
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCopyButtons();
});
