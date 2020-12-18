$(document).ready(function() {
    var filedata = 0;
    $('#drop_file').on('dragover', function() {
        return false;
    });
    $('#drop_file').on('dragleave', function() {
        return false;
    });
    $('#drop_file').on('drop', function(e) {
        e.preventDefault();
        $("#drop_file").addClass('bg-info');
        filedata = e.originalEvent.dataTransfer.files;
        var file;
        $("#drop_file").html("");
        var four = 0;
        for (var i = 0; i < filedata.length; i++) {
            file = filedata[i];
            $("#drop_file").append('<div class="col-sm-3"><img src="images/file.png" alt="file"><p>' + file["name"] + '</p></div>');
            four++;
            if (four === 4) {
                $("#drop_file").append('<div class="w-100"></div>');
                four = 0;
            }
        }
    });

    $("#file").change(function() {
        filedata = $("#file");
        $("#drop_file").html("");
        var i = 0,
            four = 0,
            len = filedata[0].files.length,
            reader, file;

        for (; i < len; i++) {
            file = filedata[0].files[i];
            $("#drop_file").append('<div class="col-sm-3"><img src="images/file.jpg" alt="file"><p>' + file["name"] + '</p></div>');
            four++;
            if (four === 4) {
                $("#drop_file").append('<div class="w-100"></div>');
                four = 0;
            }


        }
        $("#drop_file").addClass('bg-info');

    });

    $('#upload').click(function() {
        var formdata = false;
        if (window.FormData) {
            formdata = new FormData();
        }
        if (filedata === 0) {
            filedata = $("#file");
            var i = 0,
                len = filedata[0].files.length,
                reader, file;

            for (; i < len; i++) {
                file = filedata[0].files[i];

                if (window.FileReader) {
                    reader = new FileReader();
                    reader.onloadend = function(e) {
                        showUploadedItem(e.target.result, file.fileName);
                    };
                    reader.readAsDataURL(file);
                }
                if (formdata) {
                    formdata.append("file" + i.toString(), file);
                }
            }
        } else {
            var i = 0,
                len = filedata.length,
                reader, file;

            for (; i < len; i++) {
                file = filedata[i];

                if (window.FileReader) {
                    reader = new FileReader();
                    reader.onloadend = function(e) {
                        showUploadedItem(e.target.result, file.fileName);
                    };
                    reader.readAsDataURL(file);
                }
                if (formdata) {
                    formdata.append("file" + i.toString(), file);
                }
            }
        }

        if (formdata) {
            $.ajax({
                url: "upload.php",
                type: "POST",
                data: formdata,
                processData: false,
                contentType: false,
                success: function(res) {
                    alert("files uploaded");
                    filedata = 0;
                },
                error: function(res) {

                }
            });
        }
    });
});