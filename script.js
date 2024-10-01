"use strict";

document.cookie = "name=purr; max-age=20";

let modal = document.querySelector('#modal');
let modalOk = document.querySelector('#modal-ok');
let popUp = document.querySelector("#cookiePopup");
let formWrap = document.querySelector('.form-wrap');
let okWrap = document.querySelector('.ok-wrap');
let cookieWrap = document.querySelector('.cookie-wrap');
let btn = document.querySelectorAll('.btn');
let cookieBtn = document.querySelectorAll('.cookie-btn');
let closex = document.querySelectorAll('.modal-close');

function openModal(call) {
	call.classList.add('active');
}
function closeModal(call) {
	call.classList.remove('active');
}

if (document.cookie) {
	setTimeout(openModal, 5000, popUp);
}

btn.forEach((item) => {
	item.addEventListener('click', (e) => {
		e.preventDefault();
		openModal(modal);
	});
});

cookieBtn.forEach((item) => {
	item.addEventListener('click', (e) => {
		e.preventDefault();
		closeModal(popUp);
	});
});

closex.forEach((item) => {
	item.addEventListener('click', ()=> {
		closeModal(modal);
		closeModal(modalOk);
		closeModal(popUp);
	});     
});

modal.addEventListener('click', (e) => {
	const within = e.composedPath().includes(formWrap);
	if (!within) {
		closeModal(modal);
	} 
});

modalOk.addEventListener('click', (e) => {
	const withinOk = e.composedPath().includes(okWrap);
	if (!withinOk) {
		closeModal(modalOk);
	} 
});

popUp.addEventListener('click', (e) => {
	const withinOk = e.composedPath().includes(cookieWrap);
	if (!withinOk) {
		closeModal(popUp);
	} 
});

let form = document.getElementById("modal-form");

async function handleSubmit(event) {
    event.preventDefault();
    let allValid = true;
    let status = document.getElementById("modal-form-status");
    let data = new FormData(event.target);
    let req = document.querySelectorAll('.req-field');
    let reqall = document.querySelector(".req-all");

		req.forEach((item) => {
				if (item.value == "" || item.value == null) {
						allValid = false;
						item.nextElementSibling.style.display = "block";
						reqall.style.display = "block";
				} else if (item.value != "") {
						item.nextElementSibling.style.display = "none";
						reqall.style.display = "none";
					}
		});

		
    if(allValid){
				fetch(event.target.action, {
				method: form.method,
				body: data,
				headers: {
						Accept: "application/json",
				},
			}).then((response) => {
					if (response.ok) {
							setTimeout(closeModal, 1000, modal);
							setTimeout(openModal, 2000, modalOk);
							form.reset();
					} else {
							response.json().then((data) => {
									if (Object.hasOwn(data, "errors")) {
										status.innerHTML = data["errors"]
											.map((error) => error["message"])
											.join(", ");
									} else {
											status.innerHTML =
													"Oops! There was a problem submitting your form";
									}
							});
					}
			}).catch((error) => {
					status.innerHTML = "Oops! There was a problem submitting your form";
			});
		}
}

form.addEventListener("submit", handleSubmit);


IMask(document.getElementById("phone"), {
    mask: "+{7}(000)000-00-00",
});

const nav = () => {
	const burgerMenuBtn = document.querySelector(".burger-menu-btn");
	const closeBurger = document.querySelector(".close-burger");
	const navMenu = document.querySelector(".burger-menu");
	const burger = document.querySelector(".burger");

    burger.addEventListener("click", () => {
        navMenu.classList.add("active");
    });

    closeBurger.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });

		burgerMenuBtn.addEventListener("click", (e) => {
				navMenu.classList.remove("active");
		});
};

nav();











	