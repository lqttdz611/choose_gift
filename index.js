let currentOption = 0;
const mathProblems = [
  {
    question:
      "Giải phương trình vi phân:<br>d²y/dx² + 5(dy/dx) + 6y = e^(-2x)<br>Với điều kiện y(0) = 1, y'(0) = 0<br>Tính y(π) (chính xác đến 6 chữ số thập phân)",
    answer: "impossible",
  },
  {
    question:
      "Tính tích phân:<br>∫∫∫ (x²+y²+z²)^(3/2) dV<br>Trong miền V: x²+y²+z²≤1, x≥0, y≥0, z≥0<br>(Nhập kết quả dưới dạng phân số tối giản a/b, ví dụ: 3/4)",
    answer: "impossible",
  },
  {
    question:
      "Cho ma trận A cấp 5x5 với det(A) = 3<br>Biết A² - 2A + I = 0<br>Tính det(A⁻¹ + 2I - A²)<br>(I là ma trận đơn vị)",
    answer: "impossible",
  },
  {
    question:
      "Giải phương trình trong số phức:<br>z⁵ + 3z⁴ - 2z³ + z² - 4z + 1 = 0<br>Tìm tổng phần thực của tất cả các nghiệm<br>(Làm tròn đến 4 chữ số thập phân)",
    answer: "impossible",
  },
  {
    question:
      "Tính giới hạn:<br>lim(n→∞) [∑(k=1 to n) k²·sin(1/k²)] / n³<br>Nhập kết quả chính xác",
    answer: "impossible",
  },
];

const captchaProblems = [
  {
    question: "Chọn tất cả ô chứa <strong>đèn giao thông</strong>:",
    answer: "impossible",
  },
  {
    question: "Chọn tất cả ô chứa <strong>cầu thang</strong>:",
    answer: "impossible",
  },
  {
    question: "Chọn tất cả ô chứa <strong>ống khói</strong>:",
    answer: "impossible",
  },
  {
    question: "Chọn tất cả ô chứa <strong>xe buýt</strong>:",
    answer: "impossible",
  },
  {
    question: "Chọn tất cả ô chứa <strong>đèn chiếu sáng</strong>:",
    answer: "impossible",
  },
];

function showVerification(option) {
  currentOption = option;
  document.getElementById("options").style.display = "none";
  document.getElementById("verification").classList.add("active");
  document.getElementById("answer").value = "";
  document.getElementById("errorMsg").classList.remove("active");

  const mathProblemDiv = document.getElementById("mathProblem");
  const answerInput = document.getElementById("answer");

  if (option === 1) {
    // Hiển thị bài toán khó
    const randomProblem =
      mathProblems[Math.floor(Math.random() * mathProblems.length)];
    mathProblemDiv.innerHTML = randomProblem.question;
    answerInput.style.display = "block";
    answerInput.placeholder = "Nhập câu trả lời của bạn...";
  } else if (option === 2) {
    // Hiển thị CAPTCHA khó
    const randomCaptcha =
      captchaProblems[Math.floor(Math.random() * captchaProblems.length)];
    mathProblemDiv.innerHTML = randomCaptcha.question;
    answerInput.style.display = "none";

    // Tạo lưới CAPTCHA với hình ảnh khó phân biệt
    const captchaGrid = document.createElement("div");
    captchaGrid.className = "captcha-grid";
    captchaGrid.id = "captchaGrid";

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.className = "captcha-cell";
      cell.onclick = function () {
        this.classList.toggle("selected");
      };

      // Tạo canvas với hình ảnh mơ hồ khó phân biệt
      const canvas = document.createElement("canvas");
      canvas.width = 150;
      canvas.height = 150;
      canvas.className = "captcha-image";
      const ctx = canvas.getContext("2d");

      // Vẽ hình ngẫu nhiên mơ hồ
      const gradient = ctx.createLinearGradient(0, 0, 150, 150);
      gradient.addColorStop(0, `hsl(${Math.random() * 360}, 70%, 60%)`);
      gradient.addColorStop(1, `hsl(${Math.random() * 360}, 70%, 40%)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 150, 150);

      // Thêm nhiễu
      for (let j = 0; j < 200; j++) {
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        }, 0.3)`;
        ctx.fillRect(
          Math.random() * 150,
          Math.random() * 150,
          Math.random() * 20,
          Math.random() * 20
        );
      }

      // Vẽ các hình dạng mơ hồ
      for (let j = 0; j < 5; j++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * 150,
          Math.random() * 150,
          Math.random() * 30 + 10,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        }, 0.4)`;
        ctx.fill();
      }

      cell.appendChild(canvas);
      captchaGrid.appendChild(cell);
    }

    mathProblemDiv.appendChild(captchaGrid);
  }
}

function checkAnswer() {
  if (currentOption === 2) {
    // Kiểm tra CAPTCHA - luôn báo sai
    const selectedCells = document.querySelectorAll(".captcha-cell.selected");
    if (selectedCells.length === 0) {
      document.getElementById("errorMsg").textContent =
        "❌ Bạn chưa chọn ô nào! Hãy thử lại...";
    } else {
      document.getElementById("errorMsg").textContent =
        "❌ Sai rồi! Có vẻ bạn đã chọn sai ô. Hãy thử lại...";
    }
  } else {
    // Kiểm tra bài toán - luôn báo sai
    document.getElementById("errorMsg").textContent =
      "❌ Sai rồi! Câu trả lời không chính xác. Hãy thử lại...";
  }
  document.getElementById("errorMsg").classList.add("active");
  document.getElementById("answer").value = "";
}

function goBack() {
  document.getElementById("verification").classList.remove("active");
  document.getElementById("options").style.display = "flex";
  document.getElementById("errorMsg").classList.remove("active");
}

function showResult(option) {
  document.getElementById("options").style.display = "none";
  document.getElementById("result").classList.add("active");

  if (option === 3) {
    document.getElementById("resultTitle").textContent = "🎉 Chúc mừng!";
    document.getElementById("resultText").textContent =
      "Bạn đã nhận được một chiếc ô tô màu đen:";
    document.getElementById("resultImage").src = "assets/oto.jpg";
  } else if (option === 4) {
    document.getElementById("resultTitle").textContent = "🎉 Chúc mừng!";
    document.getElementById("resultText").textContent =
      "Bạn đã nhận được một đôi tất:";
    document.getElementById("resultImage").src = "assets/tat.jpg";
  }
}

function reset() {
  document.getElementById("result").classList.remove("active");
  document.getElementById("verification").classList.remove("active");
  document.getElementById("options").style.display = "flex";
  document.getElementById("errorMsg").classList.remove("active");
}
