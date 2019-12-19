(function() {
    function upload(file) {
        if (document.querySelector('h1')) {
            document.querySelector('h1').remove();
        }
        if (document.querySelector('img')) {
            document.querySelector('img').remove();
        }
        if (document.querySelector('input[type=button]')) {
            document.querySelector('input[type=button]').remove();
        }

        if (document.querySelector('input[type=file]')) {
            document.querySelector('input[type=file]').remove();
        }

        if (file.type.match(/^image\//)) {
            let img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            document.body.appendChild(img);

            let btn = document.createElement('input');
            btn.type = 'button';
            btn.value = 'Upload';
            btn.classList.add('upload');
            btn.addEventListener('click', function() {
                let fd = new FormData();
                fd.append('image', file);
                let req = new Request('./', {
                    method: 'POST',
                    body: fd
                });
                fetch(req).then(function(response) {
                    if (response.ok === true) {
                        window.location.href = response.url;
                    }
                });
            });
            document.body.appendChild(btn);
        }
    };

    document.addEventListener('paste', function(ev) {
        let file = ev.clipboardData.items[0].getAsFile();
        upload(file);
    });

    document.querySelector('.full-div').addEventListener('dragenter', function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
    });
    document.querySelector('.full-div').addEventListener('dragleave', function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
    });
    document.querySelector('.full-div').addEventListener('dragover', function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
    });
    document.querySelector('.full-div').addEventListener('drop', function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        let file = ev.dataTransfer.items[0].getAsFile();
        upload(file);
    });

    document.querySelector('.upload_file input[type=file]').addEventListener('change', function(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        let file = this.files[0];
        upload(file);
    });
})();
