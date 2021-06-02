const pincode = document.getElementById("pincode");
const datepic = document.getElementById("date");
const search = document.getElementById("search");
const na = document.getElementById("name");
const container = document.getElementById("tb");
var today = new Date();
console.log(today.toLocaleDateString("en-US"));

const getAUserProfile = (pincod, date) => {
  var pin = pincod;
  var date = date;
  const api =
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" +
    pin +
    "&date=" +
    date;
  return fetch(api)
    .then((response) => {
      if (response.status !== 200) {
        na.innerText = "Please Select Valied Pincode";
        // container.remove(newDiv);
      } else {
        na.innerText = " ";
      }

      return response.json();
    })
    .then((result) => {
      console.log("No:Of Centers" + typeof result.centers.length);
      if (result.centers.length === 0) {
        console.log("no dAta AvaiL");
        na.innerText = `No Slots Available For ${pin} At ${date} Please Select Other Date's `;
      }
      for (let x = 0; x < result.centers.length; x++) {
        const name_up = result.centers[x].name;
        const address_uphc = result.centers[x].address;
        const block_name = result.centers[x].block_name;
        const district_name = result.centers[x].district_name;
        const state_name = result.centers[x].state_name;
        const fee_ty = result.centers[x].fee_type;
        const date = result.centers[x].sessions[0].date;
        const newDiv = document.createElement("tr");
        newDiv.classList.add("pannel");
        //Date
        const datespan = document.createElement("th");
        datespan.classList.add("name");
        newDiv.appendChild(datespan);
        const date_vacc = document.createTextNode(date);
        datespan.appendChild(date_vacc);
        //Name
        const namespan = document.createElement("th");
        namespan.classList.add("name");
        newDiv.appendChild(namespan);
        const name_uphc = document.createTextNode(name_up);
        namespan.appendChild(name_uphc);
        //address
        const addressspan = document.createElement("th");
        addressspan.classList.add("address");
        newDiv.appendChild(addressspan);
        const add_uphc = document.createTextNode(address_uphc);
        addressspan.appendChild(add_uphc);
        //block_name
        const blocksspan = document.createElement("th");
        blocksspan.classList.add("block");
        newDiv.appendChild(blocksspan);
        const block_uphc = document.createTextNode(block_name);
        blocksspan.appendChild(block_uphc);
        //District
        const districtspan = document.createElement("th");
        districtspan.classList.add("dist");
        newDiv.appendChild(districtspan);
        const dist_uphc = document.createTextNode(district_name);
        districtspan.appendChild(dist_uphc);
        //StateName
        const statespan = document.createElement("th");
        statespan.classList.add("stat");
        newDiv.appendChild(statespan);
        const state_uphc = document.createTextNode(state_name);
        statespan.appendChild(state_uphc);
        // FeeType
        const feespan = document.createElement("th");
        feespan.classList.add("stat");
        newDiv.appendChild(feespan);
        const fee_type = document.createTextNode(fee_ty);
        feespan.appendChild(fee_type);
        //Sessions Start

        for (let s = 0; s < 1; s++) {
          console.log(result.centers[x].sessions[0].vaccine);
          m = result.centers[x].sessions[0];

          // result.centers[x].sessions.forEach((m) => {

          //Slots Available
          const slotspan = document.createElement("th");
          slotspan.classList.add("stat");
          newDiv.appendChild(slotspan);
          const slotavail = document.createTextNode(
            result.centers[x].sessions.length,
          );
          slotspan.appendChild(slotavail);
          console.log(
            "Length Of Sessions:" + result.centers[x].sessions.length,
          );
          //vaccineName
          const vaccinespan = document.createElement("th");
          vaccinespan.classList.add("stat");
          newDiv.appendChild(vaccinespan);
          const vaccinename = document.createTextNode(m.vaccine);
          vaccinespan.appendChild(vaccinename);
          //AgeLimit
          const availdosesspan = document.createElement("th");
          availdosesspan.classList.add("stat");
          newDiv.appendChild(availdosesspan);
          const availdoses_limit = document.createTextNode(m.min_age_limit);
          availdosesspan.appendChild(availdoses_limit);
          //Availale_Doses
          const agespan = document.createElement("th");
          agespan.classList.add("stat");
          newDiv.appendChild(agespan);
          const age_limit = document.createTextNode(m.available_capacity);
          agespan.appendChild(age_limit);
          //   //FirstDose
          //   const firstspan = document.createElement("th");
          //   firstspan.classList.add("stat");
          //   newDiv.appendChild(firstspan);
          //   const available_capacity_dose1 = document.createTextNode(
          //     m.available_capacity_dose1,
          //   );
          //   firstspan.appendChild(available_capacity_dose1);
          //   //SecondDose
          //   const secondspan = document.createElement("th");
          //   secondspan.classList.add("stat");
          //   newDiv.appendChild(secondspan);
          //   const available_capacity_dose2 = document.createTextNode(
          //     m.available_capacity_dose2,
          //   );
          //   secondspan.appendChild(available_capacity_dose2);
        }
        // });
        container.append(newDiv);
      }
    });
};

var auto_date = today.toISOString();
var mod_auto_date = auto_date.split("-");
var auto_year = mod_auto_date[0];
var auto_month = mod_auto_date[1];
var auto_day = mod_auto_date[2].split("");
var mod_auto_date = auto_day[0] + auto_day[1];
var final_auto_date = `${auto_year}-${auto_month}-${mod_auto_date}`;

pincode.addEventListener("input", function () {
  if (pincode.value.length === 6) {
    console.log("change");
    var pin = pincode.value;
    if (pin === "") {
      na.innerText = "Please Provide PinCode";
      return;
    }

    var dat = datepic.value || final_auto_date;
    if (dat === "") {
      na.innerText = "Please Provide Date";
    }
    var date_spli = dat.split("-");
    var modified_date = `${date_spli[2]}-${date_spli[1]}-${date_spli[0]}`;
    console.log("Modified-Date:" + modified_date);
    getAUserProfile(pin, modified_date);
  } else {
    na.innerText = "";
  }
});

datepic.addEventListener("input", function () {
  if (pincode.value.length === 6) {
    console.log("change");
    var pin = pincode.value;
    if (pin === "") {
      na.innerText = "Please Provide PinCode";
      return;
    }

    var dat = datepic.value; //|| today.toLocaleDateString("en-US");
    console.log(dat);
    if (dat === "") {
      na.innerText = "Please Provide Date";
    }
    var date_spli = dat.split("-");
    var modified_date = `${date_spli[2]}-${date_spli[1]}-${date_spli[0]}`;
    console.log("Modified-Date:" + modified_date);
    getAUserProfile(pin, modified_date);
  } else {
    na.innerText = "";
  }
});

console.log(final_auto_date);
