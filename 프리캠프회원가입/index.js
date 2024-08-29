let isTel = false;
let isName = false;
let isEmail = false;
let isGender = false;
let isAboutMe = false;
let isPassword = false;
let studentDetailInformation = [];

function inputValidation() {
  document.getElementById('userIntroduce').value ? isAboutMe = true : isAboutMe = false;

  const tel = isTel;
  const name = isName;
  const email = isEmail;
  const gender = isGender;
  const aboutMe = isAboutMe;
  const password = isPassword;

  if(
    tel &&
    name &&
    email &&
    gender &&
    aboutMe &&
    password
  ){
    const signUpBtn = document.getElementsByClassName('signUpBtn')[0]
    signUpBtn.disabled = false;
    signUpBtn.style = "background-color: #491449;"
  }else{
    const signUpBtn = document.getElementsByClassName('signUpBtn')[0]
    signUpBtn.disabled = true;
    signUpBtn.style = "background-color: #c7c7c7;"
  }
}

function certifiedValidityTime(verificationNumber) {
  let timer;
  let time = 179;
  timer = setInterval(() => {
    const requestCertificationNumber = document.getElementById(
      "requestCertificationNumber"
    );
    const certificationNumber = document.getElementById("certificationNumber");
    const verificationTime = document.getElementById("verificationTime");

    requestCertificationNumber.disabled = true;
    certificationNumber.innerText = verificationNumber;
    requestCertificationNumber.style =
      "background-color: #c7c7c7; color: #f2f2f2; border: none;";
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    verificationTime.innerText = `${min}:${sec}`;
    time -= 1;
    
    if (sec == "-1") {
      clearInterval(timer);
      verificationTime.style.display = "none";
      requestCertificationNumber.disabled = false;
      requestCertificationNumber.style =
        "background-color: '#ffffff'; color: '#491449'; border: 1px solid #491449;";
      certificationNumber.innerText = "000000";
    }
  }, 1000);
}

function requestVerificationNumber() {
  const verificationNumber = String(
    Math.floor(Math.random() * 1000000)
  ).padStart(6, 0);

  certifiedValidityTime(verificationNumber);
}

function showDetailInformation(studentNumber) {
  const result = studentDetailInformation[studentNumber - 1].join("\n");
  alert(result);
}

function studentList(name) {
  document.getElementById("noSubscriber").style.display = "none";
  document.getElementById("subscriberList").style.display = "block";
  const subscribers = document.getElementById("subscribers");

  const newLeaner = document.createElement("li");
  const leanerImg = document.createElement("img");
  const learnerName = document.createElement("span");
  const liLength = subscribers.getElementsByTagName("li").length;
  const liStyle =
    "margin-left: 8px; margin-bottom: 24px; font-size: 20px; font-weight: 500px; color: #ffffff; list-style-type: none; display: flex; align-items: center;";
  const imgStyle = "margin-right: 8px;";

  newLeaner.style = liStyle;
  leanerImg.style = imgStyle;
  learnerName.innerHTML = name;
  leanerImg.src = "img/프로필 이미지 (export 하세요).png";

  newLeaner.append(leanerImg, learnerName);
  newLeaner.addEventListener("click", () => {
    showDetailInformation(liLength + 1);
  });
  subscribers.appendChild(newLeaner);
  const resetInput = document.querySelectorAll("input, textarea");
  resetInput.forEach((input) => {
    input.value = "";
    input.checked = false;
  });
}

function detailInformation(detailInformationList, tel, date) {
  const phoneNumber = tel.split("-");
  const detailInformationResult = [];
  const newPhoneNumber = String(tel).replace(phoneNumber[1], "****");

  for (const key in detailInformationList) {
    if (key == "전화번호") detailInformationList[key] = newPhoneNumber;
    detailInformationResult.push(`${key}: ${detailInformationList[key]}`);
  }

  detailInformationResult.push(`(가입일시: ${date})`);
  studentList(detailInformationList.이름);
  return studentDetailInformation.push(detailInformationResult);
}

function signUp() {
  isTel = false
  isName = false
  isEmail = false
  isGender = false
  isAboutMe = false
  isPassword = false
  const signUpBtn = document.getElementsByClassName('signUpBtn')[0]
  signUpBtn.disabled = true;
  signUpBtn.style = "background-color: #c7c7c7;"

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const day = String(date.getDay()).padStart(2, 0);
  const registrationDate = `${year}-${month}-${day}`;

  const userName = document.getElementById("userName").value;
  const userEmail = document.getElementById("userEmail").value;
  const userIntroduce = document.getElementById("userIntroduce").value;
  const userPhoneNumber = document.getElementById("userPhoneNumber").value;
  const checkedAgree = document.getElementById("agree").checked ? "Y" : "N";
  const genderList = document.querySelectorAll(
    '.checkWrapper input[type="radio"]:checked'
  );
  const checkedGender = genderList[0].id;

  const detailInformationList = {
    이름: userName,
    이메일: userEmail,
    비밀번호: "****",
    성별: checkedGender,
    전화번호: userPhoneNumber,
    동의여부: checkedAgree,
    자기소개: userIntroduce,
  };

  alert(`
    회원가입을 축하합니다.
    (가입일시 : ${registrationDate})
  `);

  detailInformation(detailInformationList, userPhoneNumber, registrationDate);
}

function nameValidation() {
  const userName = document.getElementById("userName");
  const regex = /^[a-zA-Z가-힣]+$/;
  const validation = regex.test(userName.value);
  if (!validation) {
    document.getElementById("nameValidationBox").style.display = "block";
    return (userName.style = "border: 1px solid #E84F4F");
  } else {
    document.getElementById("nameValidationBox").style.display = "none";
    isName = true;
    return (userName.style = "border: 1px solid #c7c7c7");
  }
}

function emailValidation() {
  const userEmail = document.getElementById("userEmail");
  const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const validation = regex.test(userEmail.value);

  if (!validation) {
    document.getElementById("emailValidationBox").style.display = "block";
    return (userEmail.style = "border: 1px solid #E84F4F");
  }
  if (validation) {
    const userDomain = userEmail.value.split("@")[1];
    const domain = ["naver.com", "gmail.com", "hanmail.net", "kakao.com"];
    const domainValidation = domain.filter((e) => e == userDomain);

    if (domainValidation.length == 0) {
      document.getElementById("emailValidationBox").style.display = "block";
      return (userEmail.style = "border: 1px solid #E84F4F");
    } else {
      document.getElementById("emailValidationBox").style.display = "none";
      isEmail = true;
      return (userEmail.style = "border: 1px solid #c7c7c7");
    }
  } else {
    document.getElementById("emailValidationBox").style.display = "none";
    isEmail = true;
    return (userEmail.style = "border: 1px solid #c7c7c7");
  }
}

function passwordValidation() {
  const password = document.getElementById("password");
  const verifyPassword = document.getElementById("verifyPassword");
  if (password.value != verifyPassword.value) {
    document.getElementById("passwordValidationBox").style.display = "block";
    return (verifyPassword.style = "border: 1px solid #E84F4F");
  } else {
    document.getElementById("passwordValidationBox").style.display = "none";
    isPassword = true;
    return (verifyPassword.style = "border: 1px solid #c7c7c7");
  }
}

function phoneNumberValidation() {
  const userPhoneNumber = document.getElementById("userPhoneNumber");
  const regex = /^\d{3}-\d{3,4}-\d{4}$/;
  const validation = regex.test(userPhoneNumber.value);
  const startNumberValidation =
    userPhoneNumber.value.length >= 3 &&
    userPhoneNumber.value.slice(0, 3) != "010";
  if (!startNumberValidation && validation) {
    document.getElementById("phoneNumberValidationBox").style.display = "none";
    document.getElementById("startNumberValidationBox").style.display = "none";
    isTel = true;
    return (userPhoneNumber.style = "border: 1px solid #c7c7c7");
  }
  if (!startNumberValidation && !validation) {
    document.getElementById("startNumberValidationBox").style.display = "none";
    document.getElementById("phoneNumberValidationBox").style.display = "block";
    return (userPhoneNumber.style = "border: solid 1px #E84F4F");
  }
  if (startNumberValidation && !validation) {
    document.getElementById("startNumberValidationBox").style.display = "block";
    document.getElementById("phoneNumberValidationBox").style.display = "none";
    return (userPhoneNumber.style = "border: solid 1px #E84F4F");
  }
}

function genderValidation() {
  const checkedMale = document.getElementById('남성').checked;
  const checkedFemale = document.getElementById('여성').checked;
  const validationGender = checkedFemale == true || checkedMale == true

  if(validationGender == true){
    isGender = true;
  }else{
    isGender = false;
  }
}