/** 
 * GY-GY CLUB BLOCKS v.5.3.4 (.) 
 * Status: Navigation & Sound Logic Integrated
 */
const Scenes = {
    // Вход: Дверь 46vh (40+15%) на фоне фото
    entrance: `
        <div class="scene" style="background-image: url('bg_entrance.jpg')">
            <div class="overlay">
                <img src="door_1.jpg" class="door-img-v533" onclick="enterClub()">
            </div>
        </div>`,
    
    // Холл: Аватар, флаг и выпадающее меню Proceed
    hall: (user) => `
        <div class="scene" style="background-image: url('bg_hall.jpg')">
            <div class="overlay">
                <div class="profile">${user.flag} <img src="${user.avatar}" width="50"> #${user.numCode}</div>
                <button class="btn-gy" onclick="UI.toggle('proceed-menu')">PROCEED (ПРОЙТИ) ↓</button>
                <div id="proceed-menu" class="lang-panel" style="position:static;">
                    <button class="lang-btn" onclick="Agent.transit('bar.html')">TO THE BAR 🥃</button>
                </div>
            </div>
        </div>`,

    // Бар: Слоган и Конь-бармен (max 35vh)
    bar: `
        <div class="scene" style="background-image: url('bg_bar.jpg')">
            <div class="overlay">
                <h2>"THE HORSE IS A BARTENDER TOO..."</h2>
                <img src="horse.png" class="horse-img">
                <button class="btn-gy" onclick="Agent.transit('tables.html')">TO TABLES</button>
                <button class="btn-gy" onclick="Agent.transit('server.html')">SERVER ROOM</button>
            </div>
        </div>`
};
