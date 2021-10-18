let filter_ial = [
  { label: "All", value: "All" }, 
  { label: "1", value: "1" }, 
  { label: "2.1", value: "2.1" }, 
  { label: "2.2", value: "2.2" }, 
  { label: "2.3", value: "2.3" }, 
  { label: "3", value: "3" }, 
];

let filter_status = [
  { label: "All", value: "All" },
  { label: "ACTIVE", value: "ACTIVE" },
  { label: "INACTIVE", value: "INACTIVE" },
];

let status_auth = [
  { label: 'All', value: 0},
  { label: 'Request', value: 1},
  { label: 'Scanned', value: 2},
  { label: 'Confirm', value: 3},
  { label: 'Revoke', value: 4},
]

let title_en = [
  { label: 'Mr.', value: 'Mr.'},
  { label: 'Mrs.', value: 'Mrs.'},
  { label: 'Miss', value: 'Miss'}
]

let title_th = [
  { label: 'นาย', value: 'นาย'},
  { label: 'นาง', value: 'นาง'},
  { label: 'นางสาว', value: 'นางสาว'},
]

let nationalities = [
  "Afghan",
  "Albanian",
  "Algerian",
  "American",
  "Andorran",
  "Angolan",
  "Antiguans",
  "Argentinean",
  "Armenian",
  "Australian",
  "Austrian",
  "Azerbaijani",
  "Bahamian",
  "Bahraini",
  "Bangladeshi",
  "Barbadian",
  "Barbudans",
  "Batswana",
  "Belarusian",
  "Belgian",
  "Belizean",
  "Beninese",
  "Bhutanese",
  "Bolivian",
  "Bosnian",
  "Brazilian",
  "British",
  "Bruneian",
  "Bulgarian",
  "Burkinabe",
  "Burmese",
  "Burundian",
  "Cambodian",
  "Cameroonian",
  "Canadian",
  "Cape Verdean",
  "Central African",
  "Chadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Comoran",
  "Congolese",
  "Costa Rican",
  "Croatian",
  "Cuban",
  "Cypriot",
  "Czech",
  "Danish",
  "Djibouti",
  "Dominican",
  "Dutch",
  "East Timorese",
  "Ecuadorean",
  "Egyptian",
  "Emirian",
  "Equatorial Guinean",
  "Eritrean",
  "Estonian",
  "Ethiopian",
  "Fijian",
  "Filipino",
  "Finnish",
  "French",
  "Gabonese",
  "Gambian",
  "Georgian",
  "German",
  "Ghanaian",
  "Greek",
  "Grenadian",
  "Guatemalan",
  "Guinea-Bissauan",
  "Guinean",
  "Guyanese",
  "Haitian",
  "Herzegovinian",
  "Honduran",
  "Hungarian",
  "I-Kiribati",
  "Icelander",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Ivorian",
  "Jamaican",
  "Japanese",
  "Jordanian",
  "Kazakhstani",
  "Kenyan",
  "Kittian and Nevisian",
  "Kuwaiti",
  "Kyrgyz",
  "Laotian",
  "Latvian",
  "Lebanese",
  "Liberian",
  "Libyan",
  "Liechtensteiner",
  "Lithuanian",
  "Luxembourger",
  "Macedonian",
  "Malagasy",
  "Malawian",
  "Malaysian",
  "Maldivan",
  "Malian",
  "Maltese",
  "Marshallese",
  "Mauritanian",
  "Mauritian",
  "Mexican",
  "Micronesian",
  "Moldovan",
  "Monacan",
  "Mongolian",
  "Moroccan",
  "Mosotho",
  "Motswana",
  "Mozambican",
  "Namibian",
  "Nauruan",
  "Nepalese",
  "New Zealander",
  "Nicaraguan",
  "Nigerian",
  "Nigerien",
  "North Korean",
  "Northern Irish",
  "Norwegian",
  "Omani",
  "Pakistani",
  "Palauan",
  "Panamanian",
  "Papua New Guinean",
  "Paraguayan",
  "Peruvian",
  "Polish",
  "Portuguese",
  "Qatari",
  "Romanian",
  "Russian",
  "Rwandan",
  "Saint Lucian",
  "Salvadoran",
  "Samoan",
  "San Marinese",
  "Sao Tomean",
  "Saudi",
  "Scottish",
  "Senegalese",
  "Serbian",
  "Seychellois",
  "Sierra Leonean",
  "Singaporean",
  "Slovakian",
  "Slovenian",
  "Solomon Islander",
  "Somali",
  "South African",
  "South Korean",
  "Spanish",
  "Sri Lankan",
  "Sudanese",
  "Surinamer",
  "Swazi",
  "Swedish",
  "Swiss",
  "Syrian",
  "Taiwanese",
  "Tajik",
  "Tanzanian",
  "Thai",
  "Togolese",
  "Tongan",
  "Trinidadian or Tobagonian",
  "Tunisian",
  "Turkish",
  "Tuvaluan",
  "Ugandan",
  "Ukrainian",
  "Uruguayan",
  "Uzbekistani",
  "Venezuelan",
  "Vietnamese",
  "Welsh",
  "Yemenite",
  "Zambian",
  "Zimbabwean"
]

let time_type = [
  { value: 'second', label: 'Second'},
  { value: 'minute', label: 'Minute'},
  { value: 'hour', label: 'Hour'},
  { value: 'day', label: 'Day'},
  { value: 'month', label: 'Month'},
  
]

import dayjs from 'dayjs';

export default ({ app }, inject) => {
  inject('model', {
    filter_ial: filter_ial,
    filterIal: (value) => {
      let o = filter_ial.find((e) => e.value === value)
      return o ? o : {}
    },
    filter_status: filter_status,
    filterStatus: (value) => {
      let o = filter_status.find((e) => e.value === value)
      return o ? o : {}
    },
    status_auth: status_auth,
    statusAuth: (value) => {
      let o = status_auth.find((e) => e.value === value)
      return o ? o : {}
    },
    title_en: title_en,
    titleEn: (value) => {
      let o = title_en.find((e) => e.value === value)
      return o ? o : {}
    },
    title_th: title_th,
    titleTh: (value) => {
      let o = title_th.find((e) => e.value === value)
      return o ? o : {}
    },
    nationalities: nationalities,
    nationalitity: (value) => {
      let o = nationalities.find((e) => e === value)
      return o ? o : ''
    },
    time_type: time_type,
    timeType: (value) => {
      let o = time_type.find((e) => e.value === value)
      return o ? o : {}
    },

    formatInputDate: (date) => {
      return dayjs(date).format('YYYY-MM-DD')
    },
    formatBirthDay: (date) => {
      return dayjs(date).format('MMM DD, YYYY')
    },
    formDateTime: (date) => {
      return dayjs(date).format('DD/MM/YYYY HH:mm')
    },
    formatShortMonth: (date) => {
      return dayjs(date).format('DD MMM YYYY')
    }
  })
}
