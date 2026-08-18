window.GyStorage = {
    get(key, fallback = "") {
        try { return localStorage.getItem(key) || fallback; } 
        catch (e) { return fallback; }
    },
    set(key, value) {
        try { localStorage.setItem(key, value); } 
        catch (e) {}
    },
    clear() {
        try { localStorage.clear(); } 
        catch (e) {}
    }
};
