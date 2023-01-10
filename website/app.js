/* Global Variables */
const d = new Date();
const newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
const check = "https://api.openweathermap.org/data/2.5/weather?zip=";
const main = ",&appid=ca00eb283561e8381b1fc23d7f25984b&units=metric";

const server = "http://127.0.0.1:4000";
let mistake = document.getElementById("error");
document.getElementById("generate").addEventListener("click", generateInf);

function generateInf() {
  const zip = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;

  getWeatherData(zip).then(function (allData) {
    postData("/temp", {
      temp: allData.main.temp,
      city: allData.name,
      date: newDate,
      content: feelings,
    }).then(updatingUI());
  });
}

let getWeatherData = async (zip) => {
  try {
    let res = await fetch(check + zip + main);
    const allData = await res.json();

    if (allData.cod != 200) {
      mistake.innerHTML = allData.message;
      setTimeout((_) => (mistake.innerHTML = ""), 3000);
      throw `${allData.message}`;
    }
    return allData;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (url = "", allData = {}) => {
  const responseAll = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(allData),
  });
  try {
    const newData = await responseAll.json();
    document.getElementById("error").innerHTML = " ";
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

let updatingUI = async () => {
  const res = await fetch("/getRequest");

  try {
    let save = await res.json();
    console.log(save);
    document.getElementById("date").innerHTML = keepData.date;
    document.getElementById("city").innerHTML = keepData.city;
    document.getElementById("temp").innerHTML = keepData.temp + "&degC";
    document.getElementById("content").innerHTML = keepData.content;
  } catch (error) {
    console.log("error", error);
  }
};
