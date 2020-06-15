$(init);

function init() {
  $('button[name="generate"]').click(generateSchema);
}

function generateSchema(e) {
  $.ajax('/convert', {
    method: 'POST',
    data: $('#editor').val(),
    contentType: 'application/json',
    success: (data, textStatus, errorThrown) => {
      console.log(textStatus);
      updateStatus('success', 'Schema conversion succeeded');
      $('#editor').html(data);
    },
    error: (data, textStatus, jqXHR) => {
      console.log(textStatus);
      updateStatus('error', 'Schema conversion failed');
    }
  });
}

function updateStatus(status, message) {
  $('.status')
    .removeClass('success error')
    .addClass(status)
    .text(message);
}
