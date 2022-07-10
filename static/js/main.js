
function sendEmail(event){
    event.preventDefault()
    let contactMessage = document.querySelector('#contactMessage').value
    let contactName = document.querySelector('#contactName').value
    let finishMessage = `%0A%0AVery Respectfully,%0A${contactName}`
    window.location.href = `mailto:rw86001@gmail.com?subject=Hi Rex!&body=`+contactMessage+finishMessage
}
