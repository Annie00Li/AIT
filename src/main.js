document.addEventListener('DOMContentLoaded', main);

function main() {
    const btn = document.querySelector(".searchBtn");
    btn.addEventListener('click', handleSearchForm);
    
}

function handleSearchForm(evt) {
    evt.preventDefault();
 
    const input = document.querySelector('input[type="text"]').value;
    console.log(input);

    const Scholar = mongoose.model('Scholar');

   Scholar.find({name:'Abe Ziegler'},(err, scholars) => {
    for (const scholar in scholars) {
        const s = document.body.appendChild(document.createElement('div'));
        s.textContent = input;
    }
    
  });
    
}