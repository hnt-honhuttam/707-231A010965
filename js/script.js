document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. THANH TIẾN ĐỘ CUỘN TRANG
    // ==========================================
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        if (progressBar) {
            progressBar.style.width = scrollPercentage + '%';
        }
    });

    // ==========================================
    // BÀI TẬP 1: TÌM KIẾM SẢN PHẨM
    // ==========================================
    const searchInput = document.getElementById('searchInput');
    const productGrid = document.getElementById('productGrid');
    const errorMsg = document.getElementById('errorMsg');

    if (searchInput && productGrid && errorMsg) {
        const products = [
            { id: 1, name: "Cisco Router ISR 4331", price: "25.000.000đ", icon: "📡" },
            { id: 2, name: "Switch Aruba 2930F", price: "18.500.000đ", icon: "🔌" },
            { id: 3, name: "Firewall FortiGate 60F", price: "12.000.000đ", icon: "🧱" },
            { id: 4, name: "Ubiquiti UniFi AP AC Pro", price: "3.200.000đ", icon: "📶" },
            { id: 5, name: "Server Dell PowerEdge R740", price: "85.000.000đ", icon: "🗄️" }
        ];

        function renderProducts(list) {
            productGrid.innerHTML = ''; 
            if (list.length === 0) {
                errorMsg.classList.remove('hidden');
            } else {
                errorMsg.classList.add('hidden');
                list.forEach(item => {
                    const card = document.createElement('div');
                    card.className = "bg-slate-800 p-6 rounded-xl shadow-lg text-center border border-slate-700 hover:border-pink-500 transition-colors";
                    card.innerHTML = `
                        <div class="text-5xl mb-4">${item.icon}</div>
                        <h2 class="text-xl font-bold text-white mb-2">${item.name}</h2>
                        <p class="text-pink-400 font-bold text-lg">${item.price}</p>
                    `;
                    productGrid.appendChild(card);
                });
            }
        }

        renderProducts(products);

        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.trim().toLowerCase();
            const filtered = products.filter(product => 
                product.name.toLowerCase().includes(keyword)
            );
            renderProducts(filtered);
        });
    }

    // ==========================================
    // BÀI TẬP 2: FORM ĐĂNG KÝ USER
    // ==========================================
    const regForm = document.getElementById('regForm');
    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const emailError = document.getElementById('emailError');
            const pwError = document.getElementById('pwError');
            let isValid = true;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) { emailError.classList.remove('hidden'); isValid = false; } 
            else { emailError.classList.add('hidden'); }

            const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            if (!pwRegex.test(password)) { pwError.classList.remove('hidden'); isValid = false; } 
            else { pwError.classList.add('hidden'); }

            if (isValid) {
                const userData = { name: name, email: email, role: "Admin" };
                localStorage.setItem('registeredUser', JSON.stringify(userData));
                document.getElementById('successMsg').classList.remove('hidden');
                this.reset(); 
                setTimeout(() => { document.getElementById('successMsg').classList.add('hidden'); }, 4000);
            }
        });
    }

    // ==========================================
    // BÀI TẬP 3: ĐỒNG HỒ ĐẾM NGƯỢC
    // ==========================================
    const startBtn = document.getElementById('startBtn');
    const timerDisplay = document.getElementById('timerDisplay');
    
    if (startBtn && timerDisplay) {
        let countdownInterval;
        let timeLeft = 10 * 60; 

        function updateDisplay() {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            timerDisplay.textContent = `${minutes}:${seconds}`;

            if (timeLeft <= 60 && timeLeft > 0) {
                timerDisplay.classList.add('danger-mode');
                timerDisplay.classList.remove('text-green-400');
            }
        }

        function startTimer() {
            clearInterval(countdownInterval);
            startBtn.classList.add('hidden');

            countdownInterval = setInterval(() => {
                timeLeft--;
                updateDisplay();

                if (timeLeft <= 0) {
                    clearInterval(countdownInterval);
                    timerDisplay.classList.remove('danger-mode');
                    timerDisplay.classList.add('text-red-500');
                    timerDisplay.textContent = "00:00";
                    setTimeout(() => {
                        alert("⚠️ HẾT THỜI GIAN LÀM BÀI! Vui lòng nộp bài ngay!");
                        startBtn.classList.remove('hidden');
                        startBtn.textContent = "RESET ĐỒNG HỒ";
                        timeLeft = 10 * 60;
                    }, 50);
                }
            }, 1000);
        }
        startBtn.addEventListener('click', startTimer);
    }
});