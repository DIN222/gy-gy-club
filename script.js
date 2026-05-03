/** 
 * GY-GY CLUB MONOLITH BLOCKS v.5.2.5 (.)
 */
const Scenes = {
    // . ENTRANCE - Клик сюда запускает цепочку
    entrance: `
        <div class="scene">
            <img src="https://via.placeholder.com/400x600?text=DOOR" class="door-img" onclick="Agent.transit('welcome')">
            <p style="cursor:pointer" onclick="Agent.transit('welcome')">CLICK THE DOOR... ГЫ-ГЫ!</p>
        </div>`,
    
    welcome: `
        <div class="scene">
            <h1>WELCOME TO THE GY-GY VOID</h1>
            <p>Ready to get your digital soul?</p>
            <button class="btn-gy" onclick="Agent.initIdentity()">IDENTIFY DIGITAL TRACE</button>
        </div>`,

    generating: `
        <div class="scene">
            <h1>DIGITIZING...</h1>
            <div style="font-size:40px;">[#######....]</div>
        </div>`,

    hall: (user) => `
        <div class="scene">
            <div class="profile">${user.flag} ${user.avatar} <span>#${user.numCode}</span></div>
            <h2>YOU ARE IN THE HALL</h2>
            <button class="btn-gy" onclick="Agent.transit('bar')">PROCEED TO BAR 🥃</button>
        </div>`,

    bar: `
        <div class="scene">
            <h2>"THE HORSE IS A BARTENDER TOO..."</h2>
            <img src="https://via.placeholder.com/600x400?text=HORSE" class="horse-img">
            <button class="btn-gy" onclick="Agent.transit('tables')">TO THE TABLES</button>
        </div>`,

    tables: `
        <div class="scene">
            <h3>6 TABLES & MIC 🎤</h3>
            <button class="btn-gy" onclick="Agent.transit('bar')">BACK TO BAR</button>
        </div>`
};
