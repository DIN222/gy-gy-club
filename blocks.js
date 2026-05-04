/** 
 * GY-GY CLUB BLOCKS v.5.2.8 (.)
 * Логистика: Вход -> Приветствие -> ID -> Холл.
 */
const Scenes = {
    // Вход: Дверь макс 40vh.
    entrance: `
        <div class="scene" style="background-image: url('bg-entrance.jpg')">
            <div class="overlay">
                <img src="door.png" class="door-img" onclick="Agent.transit('welcome')">
                <p>THE DOOR IS JUDGING YOU... CLICK IT! ГЫ-ГЫ!</p>
            </div>
        </div>`,
    
    // Зона приветствия
    welcome: `
        <div class="scene" style="background-image: url('bg-welcome.jpg')">
            <div class="overlay">
                <h1>WELCOME TO THE VOID</h1>
                <button class="btn-gy" onclick="Agent.initIdentity()">BECOME DIGITAL</button>
            </div>
        </div>`,

    // Генерация ID: Порядковый номер + 4 цифры.
    generating: `
        <div class="scene" style="background-image: url('bg-matrix.jpg')">
            <div class="overlay">
                <h1>DIGITIZING...</h1>
                <div style="font-size:30px; letter-spacing:5px;">[#######....]</div>
            </div>
        </div>`,

    // Холл: Аватар, флаг и кнопка Proceed.
    hall: (user) => `
        <div class="scene" style="background-image: url('bg-hall.jpg')">
            <div class="overlay">
                <div class="profile">
                    <img src="${user.avatar}" style="width:100px;"> 
                    <span>${user.flag} #${user.numCode}</span>
                </div>
                <h2>YOU ARE OFFICIALLY A GUEST</h2>
                <div style="position:relative;">
                    <button class="btn-gy" onclick="UI.toggle('proceed-menu')">PROCEED (GO DEEPER) ↓</button>
                    <div id="proceed-menu" class="drop-list" style="position:static;">
                        <div class="drop-item" onclick="Agent.transit('bar')">To the Bar 🥃</div>
                    </div>
                </div>
            </div>
        </div>`,

    // Бар: Конь макс 35vh.
    bar: `
        <div class="scene" style="background-image: url('bg-bar.jpg')">
            <div class="overlay">
                <h2>"THE HORSE IS A BARTENDER TOO..."</h2>
                <img src="horse.png" class="horse-img">
                <button class="btn-gy" onclick="Agent.transit('tables')">TO THE TABLES</button>
            </div>
        </div>`,

    // Столики: Схема + Микрофон.
    tables: `
        <div class="scene" style="background-image: url('bg-tables.jpg')">
            <div class="overlay">
                <h3>6 TABLES & A MIC 🎤</h3>
                <p>[Sound 2.0: Pouring & Coughing]</p>
                <button class="btn-gy" onclick="Agent.transit('bar')">BACK TO HORSE</button>
            </div>
        </div>`
};
