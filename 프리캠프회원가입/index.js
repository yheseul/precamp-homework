let studentDetailInformation = [];

function certifiedValidityTime(verificationNumber) {
  let timer;
  let time = 179;
  timer = setInterval(() => {
    document.getElementById("requestCertificationNumber").disabled = true;
    document.getElementById("certificationNumber").innerText =
      verificationNumber;
    document.getElementById("requestCertificationNumber").style =
      "background-color: #c7c7c7; color: #f2f2f2; border: none;";
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    document.getElementById("verificationTime").innerText = `${min}:${sec}`;
    time -= 1;

    if (sec == "-1") {
      clearInterval(timer);
      document.getElementById("verificationTime").style.display = "none";
      document.getElementById("requestCertificationNumber").disabled = false;
      document.getElementById("requestCertificationNumber").style =
      "background-color: '#ffffff'; color: '#491449'; border: 1px solid #491449;";
      document.getElementById("certificationNumber").innerText = '000000'
    }
  }, 1000);
}

function requestVerificationNumber() {
  const verificationNumber = String(
    Math.floor(Math.random() * 1000000)
  ).padStart(6, 0);

  certifiedValidityTime(verificationNumber)
}

function showDetailInformation(studentNumber) {
  const result = studentDetailInformation[studentNumber-1].join('\n')
  alert(result)
}

function studentList() {
  document.getElementById("noSubscriber").style.display = "none";
  document.getElementById("subscriberList").style.display = "block";

  const newLeaner = document.createElement("li");
  const leanerImg = document.createElement("img");
  const learnerName = document.createElement("span");
  const liLength = document.getElementById("subscribers").getElementsByTagName("li").length;
  const liStyle ="margin-left: 8px; margin-bottom: 24px; font-size: 20px; font-weight: 500px; color: #ffffff; list-style-type: none; display: flex; align-items: center;";
  const imgStyle = "margin-right: 8px;"

  newLeaner.style = liStyle;
  leanerImg.style = imgStyle;
  learnerName.innerHTML = `수강생 ${liLength + 1}`;
  leanerImg.src = "img/프로필 이미지 (export 하세요).png";

  newLeaner.append(leanerImg, learnerName);
  newLeaner.addEventListener('click', () => {
    showDetailInformation(liLength+1)
  })
  document.getElementById("subscribers").appendChild(newLeaner);
  const resetInput = document.querySelectorAll('input')
  resetInput.forEach(input => {
    input.value = '';
    input.checked = false;
  })
}

function detailInformation(detailInformationList, tel, date) {
  const phoneNumber = tel.split('-')
  const newPhoneNumber = String(tel).replace(phoneNumber[1], "****")
  const detailInformationResult = [];
  
  for (const key in detailInformationList) {
    if(key == '전화번호') detailInformationList[key] = newPhoneNumber;
    detailInformationResult.push(`${key}: ${detailInformationList[key]}`)
  }

  detailInformationResult.push(`(가입일시: ${date})`)
  studentList();
  return studentDetailInformation.push(detailInformationResult);
}

function signUp() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const day = String(date.getDay()).padStart(2, 0);
  const registrationDate = `${year}-${month}-${day}`

  const information = document.querySelectorAll("#userInformation")
  const informationList = [...information].map(e => e.value)
  const genderList = document.querySelectorAll('.checkWrapper input[type="radio"]:checked') 
  const checkedGender = genderList[0].id;
  const checkedAgree = document.getElementById("agree").checked ? 'Y' : 'N'
  
  const detailInformationList = {
    이름: informationList[0],
    이메일: informationList[1],
    비밀번호: '****',
    성별: checkedGender,
    전화번호: informationList[2],
    동의여부: checkedAgree,
    자기소개: informationList[3],
  }

  alert(`
    회원가입을 축하합니다.
    (가입일시 : ${registrationDate})
  `);

  detailInformation(detailInformationList, informationList[2], registrationDate);
}
