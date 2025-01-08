

let igIcon = document.getElementById('instagram');
let fbIcon = document.getElementById('fb');
let rooms = [
  {
    name: 'cuarto-creciente',
    imgs: [
      '../assets/cuarto-creciente.jpg',
      '../assets/cuarto-creciente.jpg',
      '../assets/cuarto-creciente.jpg'
    ]
  }
]

function openMenu() {
  let menu = document.getElementById("myLinks");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}

function showRoomInfo(room) {
  let roomInfo = document.getElementById("gallery");
  roomInfo.style.display = "block";
  let roomPhotos = document.getElementById("room-photos");
  let ul = document.createElement("ul")
  roomPhotos.append(ul)
  if (rooms.filter(item => item.name) == room) {
    item.imgs //forEach create a li
  }
}

function closeRoomInfo() {
  let roomInfo = document.getElementById("gallery");
  roomInfo.style.display = "none";
  console.log("Room info closed.");
}

igIcon.addEventListener('click', function (event) {
  igIcon.classList.add('flip')
});

fbIcon.addEventListener('click', function (event) {
  fbIcon.classList.add('flip')
});
