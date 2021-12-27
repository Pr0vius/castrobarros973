"use strict";
import { sliderData, blueprintData, newsData, infoData } from "./utils/data.js";
import {
  getBlueprintTemplate,
  getBlueprintModalTemplate,
  getNavDDMenuOptions,
  getNews,
  renderNotificationMessage,
  sendMail,
} from "./utils/functions.js";
console.log('JavaScript Loaded')
const body = document.querySelector("body");
const loadScreen = document.querySelector("#loadScreen");
const slider = document.querySelector(".swiper-wrapper");
const BPCont = document.querySelector("#blueprints");
const navDDMenu = document.querySelector("#NavDDMenu");
const newSection = document.querySelector("#novedades");
const infoList = document.querySelector(".info__content-ul");
const contactForm = document.querySelector("#contact-form");
infoList.innerHTML += infoData
  .map(e => `<li class="info__content-li">${e}</li>`)
  .join("");

sliderData.forEach(e => {
  const slide = document.createElement("div");
  slide.className = "swiper-slide";
  slide.innerHTML = `
    <img
      class="slide-img"
      src="${e.img}"
      alt="${e.comment}"
    />
    <p>${e.comment}</p>`;
  slider.appendChild(slide);
});

newsData.length > 0 ? (newSection.innerHTML = getNews(newsData.reverse())) : "";

blueprintData.forEach((e, i) => {
  BPCont.innerHTML += getBlueprintModalTemplate(e) + getBlueprintTemplate(e);
  navDDMenu.innerHTML += getNavDDMenuOptions(e, i);
});

contactForm.addEventListener("submit", async evt => {
  evt.preventDefault();
  sendMail(contactForm)
    .then(res => res.text())
    .then(e => renderNotificationMessage(e));
});

window.addEventListener("load", () => {
  body.removeAttribute("style");
  loadScreen.classList.remove("active");
});
