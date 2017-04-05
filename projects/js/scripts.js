var feedback = document.querySelector(".feedback");
var popup = document.querySelector(".feedback_popup");
var overlay = document.querySelector(".feedback_popup_overlay");
var close = document.querySelector(".close_popup");
var fio = popup.querySelector("[name=fio]");
var question = popup.querySelector("[name=question]");
var email = popup.querySelector("[name=email]");
var fio_label = popup.querySelector(".fio_label");
var question_label = popup.querySelector(".question_label");
var email_label = popup.querySelector(".email_label");
var storage_name = localStorage.getItem("name");
var storage_email = localStorage.getItem("email");

feedback.addEventListener("click", function(event) {
	event.preventDefault();
	popup.classList.add("feedback_popup_show");
	overlay.classList.add("overlay_show");
	if (storage_name && storage_email) {
		fio.value = storage_name;
		email.value = storage_email;
		question.focus();
	} else {
		fio.focus();
	}
});

close.addEventListener("click", function(event) {
event.preventDefault();
popup.classList.remove("feedback_popup_show");
overlay.classList.remove("overlay_show");
popup.classList.remove("modal-error");
});

popup.addEventListener("submit", function(event) {
	if (!fio.value || !email.value || !question.value) {
		event.preventDefault();
		popup.classList.remove("feedback_popup_error");
		popup.offsetWidth = popup.offsetWidth;
		popup.classList.add("feedback_popup_error");
	} 
	else {
		localStorage.setItem("name", fio.value);
		localStorage.setItem("email", email.value);
	}
});

window.addEventListener("keydown", function(event)
	{
if (event.keyCode===27) {
	if (popup.classList.contains("feedback_popup_show") && overlay.classList.contains("overlay_show")) {
		popup.classList.remove("feedback_popup_show");
		overlay.classList.remove("overlay_show");
		popup.classList.remove("modal-error");
		}
	}
});

overlay.addEventListener("click", function(event) {
	if (popup.classList.contains("feedback_popup_show") && overlay.classList.contains("overlay_show")) {
		popup.classList.remove("feedback_popup_show");
		overlay.classList.remove("overlay_show");
		popup.classList.remove("modal-error");
	}
});

function addLabel(input, label){
	if (input.value) {
		label.classList.add("popup_label_value");
	}
}

fio.addEventListener("change", function(event) {
	addLabel(fio, fio_label);
});

email.addEventListener("change", function(event) {
	addLabel(email, email_label);
});

question.addEventListener("change", function(event) {
	addLabel(question, question_label);
});
