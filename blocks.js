/** 
 * GY-GY CLUB MONOLITH BLOCKS v.5.2.5 (.)
 */
const Scenes = {
    // . ENTRANCE
    entrance: `
        <div class="scene">
            <img src="https://via.placeholder.com/400x600?text=DOOR" class="door-img" onclick="Agent.transit('welcome')">
            <p>CLICK THE DOOR... ГЫ-ГЫ!</p>
        </div>`,
    
    // . WELCOME ZONE
    welcome: `
        <div class="scene">
            <h1>WELCOME TO THE GY-GY VOID</h1>
            <button class="btn-gy" onclick="Agent.initIdentity()">IDENTIFY DIGITAL TRACE</button>
        </div>`,

    // . ID GENERATION
    generating: `
        <div class="scene">
            <h1>DIGITIZING...</h1>
            <div style="font-size:40px; animation: pulse 1s infinite;">[#######....]</div>
        </div>`,

    // . THE HALL
    hall: (user) => `
        <div class="scene">
            <div class="profile">${user.flag} ${user.avatar} <span>#${user.numCode}</span></div>
            <h2>YOU ARE IN THE HALL</h2>
            <div style="position:relative;">
                <button class="btn-gy" onclick="UI.toggle('proceed-menu')">PROCEED ↓</button>
                <div id="proceed-menu" class="drop-list" style="position:static;">
                    <div class="drop-item" onclick="Agent.transit('bar')">To the Bar 🥃</div>
                </div>
            </div>
        </div>`,

    // . THE BAR
    bar: `
        <div class="scene">
            <h2>"THE HORSE IS A BARTENDER TOO..."</h2>
            <img src="https://via.placeholder.com/600x400?text=HORSE" class="horse-img">
            <button class="btn-gy" onclick="Agent.transit('tables')">TO THE TABLES</button>
        </div>`,

    // . TABLES
    tables: `
        <div class="scene">
            <h3>TABLES MAP & MIC 🎤</h3>
            <p>[Pouring Sounds 2.0 active]</p>
            <button class="btn-gy" onclick="Agent.transit('bar')">BACK TO BAR</button>
        </div>`
};
