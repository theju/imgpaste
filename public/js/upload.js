(function() {
    function upload(ev) {
        if (document.querySelector('h1')) {
            document.querySelector('h1').remove();
        }
        if (document.querySelector('img')) {
            document.querySelector('img').remove();
        }
        if (document.querySelector('input[type=button]')) {
            document.querySelector('input[type=button]').remove();
        }

        let dt = ev.dataTransfer;
        if (ev.type === 'paste') {
            dt = ev.clipboardData;
        }
        let it = dt.items[0];
        if (it.type.match(/^image\//)) {
            let ff = it.getAsFile();
            let img = document.createElement('img');
            img.src = URL.createObjectURL(ff);
            document.body.appendChild(img);

            let btn = document.createElement('input');
            btn.type = 'button';
            btn.value = 'Upload';
            btn.classList.add('upload');
            btn.addEventListener('click', function() {
                let fd = new FormData();
                fd.append('image', ff);
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

    document.addEventListener('paste', upload);

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
        upload(ev);
    });
})();
