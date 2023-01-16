
  // Get HTML head element
  const head = document.getElementsByTagName("HEAD")[0];
  
  // Create new link Element
  const link = document.createElement("link");
  
  // set the attributes for link element
  link.rel = "stylesheet";
  
  link.type = "text/css";
  
  link.href =
    "https://on.spdji.com/rs/838-LDP-483/images/dynamic-form-style.css";

  
  // Append link element to HTML head
  head.appendChild(link);

  // This hides the field where a Script tag with an id of 'dynamic-script' is being placed on the Form
  try {
    const scriptElement =
      document.getElementById("dynamic-script").parentNode.parentNode.parentNode
        .parentNode;
    scriptElement.style.cssText = "display: none !important";
  } catch (err) {
    console.log("Notice: No dynamic global script tag added to Marketo form");
  }

  MktoForms2.whenReady(function (){
    const marketoForm = document.querySelector('form.mktoForm');
    const marketoRow = document.querySelectorAll('.mktoFormRow');
    console.log(marketoRow[0].childNodes.length );
    window.onresize = () => {
      if(marketoForm.offsetWidth < 400) {
        marketoRow.forEach(row => {
          row.style.cssText='grid-template-columns: 1fr !important;';
        })
      }
      else {
        marketoRow.forEach(row => {
          row.style.cssText='repeat(auto-fit, minmax(100px, 1fr)) !important;';
        })
      }
    }
  }) 
  