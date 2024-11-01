import checkNumInputs from "./checkNumInputs";

const forms = (state) => {

    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input');
          


         checkNumInputs('input[name="user_phone"]');
         
          const message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро с вами свяжемся',
            failure: 'Что-то пошло не так...'

          };

          const postData = async (url, data) =>{
            document.querySelector('.status').textContent = message.loading;
            let res = await fetch(url, {
                method: 'POST',
                body: data
            });

            return await res.text();
          };

          const clearInputs = () => {
            input.forEach(item => {
                item.value = '';
            })
          }

          form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMassage = document.createElement('div');
                statusMassage.classList.add('status');
                item.appendChild(statusMassage);

                const formData = new FormData(item);
                if(item.getAttribute('data-calc') === 'end'){
                  for (let key in state){
                    formData.append(key, state[key])
                  }
                }

                postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMassage.textContent = message.success
                } )
                .catch(() => statusMassage.textContent = message.failure)

                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMassage.remove()
                    }, 5000); 
                });
            });
          });
};

export default forms;