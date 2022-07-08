const grid = document.querySelector(".grid");
const nickMoamor = document.querySelector(".nick_moamor");
const timer = document.querySelector(".timer");
const modal = document.querySelector(".modal_win_container");
const closeModal = document.querySelector(".modal_win_container span");
const textModal = document.querySelector(".modal_win_container .modal p");
const pathToOurPhotos = "../images";

const ourPhotos = [];

for (let i = 1; i <= 10; i++) {
	ourPhotos.push(`foto_${i}.jpeg`);
}

const createElement = (tag, className) => {
	const el = document.createElement(tag);
	el.className = className;

	return el;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
	const disabledCards = document.querySelectorAll(".disabled-card");

	if (disabledCards.length >= ourPhotos.length * 2) {
		clearInterval(this.timer);
		textModal.innerHTML = `Parabéns, Amor! Você Ganhou! Seu tempo foi de ${timer.innerHTML}s!`;
		modal.classList.add("show");
	}
};

closeModal.addEventListener("click", () => modal.classList.remove("show"));

const checkCards = () => {
	const firstPhoto = firstCard.dataset.photo;
	const secondPhoto = secondCard.dataset.photo;

	if (firstPhoto === secondPhoto) {
		setTimeout(() => {
			firstCard.firstChild.classList.add("disabled-card");
			secondCard.firstChild.classList.add("disabled-card");

			firstCard = "";
			secondCard = "";

			checkEndGame();
		}, 800);
	} else {
		setTimeout(() => {
			firstCard.classList.remove("reveal-card");
			secondCard.classList.remove("reveal-card");

			firstCard = "";
			secondCard = "";
		}, 800);
	}
};

const revealCard = ({ target }) => {
	if (target.parentNode.className.includes("reveal-card")) return;

	if (firstCard === "") {
		target.parentNode.classList.add("reveal-card");
		firstCard = target.parentNode;
	} else if (secondCard === "") {
		target.parentNode.classList.add("reveal-card");
		secondCard = target.parentNode;

		checkCards();
	}
};

const createCard = photo => {
	const card = createElement("div", "card");
	const front = createElement("div", "face front");
	const back = createElement("div", "face back");

	front.style.backgroundImage = `url(${pathToOurPhotos}/${photo})`;

	card.appendChild(front);
	card.appendChild(back);

	card.addEventListener("click", revealCard);
	card.setAttribute("data-photo", photo);

	return card;
};

const loadGame = () => {
	const duplicatedPhotos = [...ourPhotos, ...ourPhotos];

	const shuffledPhotos = duplicatedPhotos.sort(() => Math.random() - 0.5);

	shuffledPhotos.forEach(photo => {
		const card = createCard(photo);

		grid.appendChild(card);
	});
};

const startTimer = () => {
	this.timer = setInterval(() => {
		const currentTimer = +timer.innerHTML;

		timer.innerHTML = String(currentTimer + 1).padStart(2, "0");
	}, 1000);
};

window.onload = () => {
	if (localStorage.getItem("nick_moamor")) {
		nickMoamor.innerHTML = localStorage.getItem("nick_moamor");
		loadGame();
		startTimer();
	} else {
		window.location = "../index.html";
	}
};
