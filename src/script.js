function copyToClipboard() {
    const inputField = document.getElementById('address-input-freelancer');
    inputField.select();
    document.execCommand('copy');
    
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = 'Copied!';
    showTooltip();
    
    setTimeout(() => {
        hideTooltip();
    }, 1000);
}

function showTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.add('show');
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

function deployAnimation() {
    const animation = document.getElementById("deploy-animation");
    document.getElementById("deploy-contract-form").style.display = "none";
    animation.classList.remove("hidden");
}