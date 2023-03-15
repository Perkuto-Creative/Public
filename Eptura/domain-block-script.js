var userOptions = {
  basePath: "https://staging.eptura.com/rs/267-JUP-120/images/" /* /rs/123-ABC-456images/ if in Marketo Design Studio */
};
var lists = [
  {
    name: "disposable",
    file: "disposable.txt",
    error: "Must be a business email."
  },
  {
    name: "free",
    file: "disposable.txt",
    error: "Must be a business email."
  }
];

/* --- No need to edit below this line! --- */

lists.forEach(function(list) {
  var listObj = document.createElement("object");

  listObj.type = "text/plain";
  listObj.data = userOptions.basePath + list.file;
  listObj.onload = function(e) {
    list.RE = new RegExp(
      "@(" +
        this.contentDocument.documentElement.textContent
          .split("\n")
          .join("|")
          .replace(".", "\\.") +
        ")$"
    );
  };
  document.body.appendChild(listObj);
});

MktoForms2.whenReady(function(form) {
  var emailJQ = form.getFormElem().find("#Email");

  form.onValidate(function(nativeValid) {
    if (!nativeValid) return;

    var email = form.getValues().Email,
        firstError;
    
    if (lists.some(function(list) {
        if (list.RE && list.RE.test(email)) {
          firstError = list.error;
          return true;
        }
      })) {
      form.submittable(false);
      form.showErrorMessage(firstError, emailJQ);
    } else {
      form.submittable(true);
    }
  });
});
