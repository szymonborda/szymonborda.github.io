let coupon = document.querySelectorAll('.coupon')[0];

for (let i = 1; i < 50; i++) {
    let number = document.createElement('div');
    number.textContent = '[' + i + ']';
    number.setAttribute('data-number', i);
    number.className = 'number';
    coupon.append(number);
}