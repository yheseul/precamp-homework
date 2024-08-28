function signUp() {
  const email = document.getElementById("email").value;
  const splitEmail = email.split('@');
  const newId = splitEmail[0].slice(0, splitEmail[0].length - 4) + '****';
  
  alert(`회원가입을 축하합니다. 가입하신 이메일은 ${newId}@${splitEmail[1]}입니다.`)
}