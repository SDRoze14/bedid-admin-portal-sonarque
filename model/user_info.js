const user = {
    "user_id": {
        "value": "",
        "classification": "C",
        "source": 4,
    },
    "internet_address": {
        "email": {
            "value": ""
        },
        "classification": "C",
        "source": 4,
    },
    "person_id": {
        "citizen_id": {
            "value": ""
        },
        "passport_no": {
            "value": ""
        },
        "issue_country": {
            "code": "",
            "description": ""
        },
        "type": "",
        "classification": "C",
        "source": 4,
    },
    "name_th": {
        "prefix": {
            "value": ""
        },
        "first_name": {
            "value": ""
        },
        "middle_name": {
            "value": ""
        },
        "last_name": {
            "value": ""
        },
        "classification": "P",
        "source": 4,
    },
    "name_en": {
        "prefix": {
            "value": ""
        },
        "first_name": {
            "value": ""
        },
        "middle_name": {
            "value": " "
        },
        "last_name": {
            "value": ""
        },
        "classification": "P",
        "source": 4,
    },
    "dob": {
        "value": "",
        "classification": "C",
        "source": 4,
    },
    "sex": {
        "code": "m",
        "desc": "Male",
        "classification": "P",
        "source": 4,
    },
    "nationality": {
        "code": "",
        "desc": "",
        "classification": "C",
        "source": 4,
    },
    "register_address": {
        "type": "TH",
        "sequence": {
            "value": 0
        },
        "building": {
            "value": ""
        },
        "room_no": {
            "value": ""
        },
        "floor": {
            "value": ""
        },
        "village_name": {
            "value": ""
        },
        "no": {
            "value": ""
        },
        "moo": {
            "value": ""
        },
        "alley": {
            "value": ""
        },
        "soi": {
            "value": ""
        },
        "road": {
            "value": ""
        },
        "tumbol": {
            "value": ""
        },
        "amphur": {
            "value": ""
        },
        "province": {
            "value": ""
        },
        "code": {
            "value": ""
        },
        "zipcode": {
            "value": ""
        },
        "phone": {
            "value": ""
        },
        "classification": "C",
        "source": 4,
    },
    "residential_address": {
        "type": "",
        "sequence": {
            "value": 0
        },
        "building": {
            "value": ""
        },
        "room_no": {
            "value": ""
        },
        "floor": {
            "value": ""
        },
        "village_name": {
            "value": ""
        },
        "no": {
            "value": ""
        },
        "moo": {
            "value": ""
        },
        "alley": {
            "value": ""
        },
        "soi": {
            "value": ""
        },
        "road": {
            "value": ""
        },
        "tumbol": {
            "value": ""
        },
        "amphur": {
            "value": ""
        },
        "province": {
            "value": ""
        },
        "code": {
            "value": ""
        },
        "zipcode": {
            "value": ""
        },
        "phone": {
            "value": ""
        },
        "classification": "C",
        "source": 4,
    },
    "billing_address": {
        "type": "",
        "sequence": {
            "value": 0
        },
        "building": {
            "value": ""
        },
        "room_no": {
            "value": ""
        },
        "floor": {
            "value": ""
        },
        "village_name": {
            "value": ""
        },
        "no": {
            "value": ""
        },
        "moo": {
            "value": ""
        },
        "alley": {
            "value": ""
        },
        "soi": {
            "value": ""
        },
        "road": {
            "value": ""
        },
        "tumbol": {
            "value": ""
        },
        "amphur": {
            "value": ""
        },
        "province": {
            "value": ""
        },
        "code": {
            "value": ""
        },
        "zipcode": {
            "value": ""
        },
        "phone": {
            "value": ""
        },
        "classification": "C",
        "source": 4,
    },
    "phone": {
        "prefix": {
            "value": ""
        },
        "area_code": {
            "value": ""
        },
        "nbr": {
            "value": ""
        },
        "classification": "C",
        "source": 4,
    },
    "ial": {
        "value": 1,
        "classification": "C",
        "source": 4,
    },
    "active": {
        "value": true,
        "classification": "C",
        "source": 4,
    }
};

function set_user_id(user_id) {
    user.user_id.value = user_id;
}

function set_email(email) {
    user.internet_address.email.value = email
}

function set_person_id(type, id_number) {
    if (type == "1") {
        user.person_id.citizen_id.value = id_number;
    } else {
        user.person_id.passport_no.value = id_number;
    }
}

function set_name_en(prefix, first_name, middle_name, last_name) {
    user.name_en.prefix.value = prefix;
    user.name_en.first_name.value = first_name;
    user.name_en.middle_name.value = middle_name;
    user.name_en.last_name.value = last_name;
}

function set_name_th(prefix, first_name, middle_name, last_name) {
    user.name_th.prefix.value = prefix;
    user.name_th.first_name.value = first_name;
    user.name_th.middle_name.value = middle_name;
    user.name_th.last_name.value = last_name;
}

function set_gender(gender) {
    if (gender === 'male')
        user.sex.code = 'm'
    else
        user.sex.code = 'f'

    user.sex.desc = gender;
}

function set_birth_day(birth_day) {
    user.dob.value = birth_day;
}

function set_nationality(code, nation) {
    user.nationality.code = code;
    user.nationality.desc = nation;
}

function set_register_address(type, no, moo, alley, soi, road, province, district, subdistrict, zipcode) {
    user.register_address.type = type;
    user.register_address.no.value = no;
    user.register_address.moo.value = moo;
    user.register_address.alley.value = alley;
    user.register_address.soi.value = soi;
    user.register_address.road.value = road;
    user.register_address.province.value = province;
    user.register_address.amphur.value = district;
    user.register_address.tumbol.value = subdistrict;
    user.register_address.zipcode.value = zipcode;
}

function set_billing_address(type, no, moo, alley, soi, road, province, district, subdistrict, zipcode) {
    user.billing_address.type = type;
    user.billing_address.no.value = no;
    user.billing_address.moo.value = moo;
    user.billing_address.alley.value = alley;
    user.billing_address.soi.value = soi;
    user.billing_address.road.value = road;
    user.billing_address.province.value = province;
    user.billing_address.amphur.value = district;
    user.billing_address.tumbol.value = subdistrict;
    user.billing_address.zipcode.value = zipcode;
}

function set_residential_address(is_residential) {
    if (is_residential) {
        user.residential_address.type = user.register_address.type;
        user.residential_address.no.value = user.register_address.no.value;
        user.residential_address.moo.value = user.register_address.moo.value;
        user.residential_address.alley.value = user.register_address.alley.value;
        user.residential_address.soi.value = user.register_address.soi.value;
        user.residential_address.road.value = user.register_address.road.value;
        user.residential_address.province.value = user.register_address.province.value;
        user.residential_address.amphur.value = user.register_address.amphur.value;
        user.residential_address.tumbol.value = user.register_address.tumbol.value;
        user.residential_address.zipcode.value = user.register_address.zipcode.value;
    } else {
        user.residential_address.type = ""
        user.residential_address.no.value = ""
        user.residential_address.moo.value = ""
        user.residential_address.alley.value = ""
        user.residential_address.soi.value = ""
        user.residential_address.road.value = ""
        user.residential_address.province.value = ""
        user.residential_address.amphur.value = ""
        user.residential_address.tumbol.value = ""
        user.residential_address.zipcode.value = ""
    }
}

function set_billing_address_is_register(is_register) {
    if (is_register) {
        user.billing_address.type = user.register_address.type;
        user.billing_address.no.value = user.register_address.no.value;
        user.billing_address.moo.value = user.register_address.moo.value;
        user.billing_address.alley.value = user.register_address.alley.value;
        user.billing_address.soi.value = user.register_address.soi.value;
        user.billing_address.road.value = user.register_address.road.value;
        user.billing_address.province.value = user.register_address.province.value;
        user.billing_address.amphur.value = user.register_address.amphur.value;
        user.billing_address.tumbol.value = user.register_address.tumbol.value;
        user.billing_address.zipcode.value = user.register_address.zipcode.value;
    } else {
        user.billing_address.type = ""
        user.billing_address.no.value = ""
        user.billing_address.moo.value = ""
        user.billing_address.alley.value = ""
        user.billing_address.soi.value = ""
        user.billing_address.road.value = ""
        user.billing_address.province.value = ""
        user.billing_address.amphur.value = ""
        user.billing_address.tumbol.value = ""
        user.billing_address.zipcode.value = ""
    }
}

function set_phone(number) {
    user.phone.nbr.value = number;
}

function set_IAL(value) {
    user.ial.value = parseFloat(value);
}

function get_model() {
    return user;
}

module.exports = {
    set_user_id,
    set_email,
    set_person_id,
    set_name_en,
    set_name_th,
    set_gender,
    set_birth_day,
    set_nationality,
    set_register_address,
    set_billing_address,
    set_residential_address,
    set_billing_address_is_register,
    set_phone,
    set_IAL,

    get_model
}