let bookslist = document.getElementById("bookslist");
let authorlist = document.getElementById("authorlist");
let pagelist = document.getElementById("pagelist");
let statuslist = document.getElementById("statuslist");
let removelist = document.getElementById("removelist");

var myLibrary = [];

const modal = document.getElementById("addbook-dialog");
const addbook = document.getElementById("addbook");
const removebook = document.getElementById("removebook");
const close = document.getElementById("cancel-button");
const submit = document.getElementById("submit-button");



addbook.addEventListener("click", ()=>
{
    modal.showModal();
})


close.addEventListener("click",()=>
{
    modal.close();
})

submit.addEventListener("click",()=>
{
    const bookname = document.getElementById("bookname").value;
    const authorname = document.getElementById("authorname").value;
    const pagecount = document.getElementById("pagecount").value;
    const readcheck = document.querySelector('input[name="read-status"]:checked');
    const bookid = crypto.randomUUID();
    const mybook = new Book(bookname, authorname, pagecount, readcheck.value, bookid)

})


function Book(bookname, authorname, pagecount, readcheck, uid){
    this.bookname = bookname;
    this.authorname = authorname;
    this.pagecount = pagecount;
    this.readcheck = readcheck;
    this.uid = uid;
    myLibrary.push(this);
    display();
}

Book.prototype.togglereadstatus = function(value){

    this.readcheck = value;
}


function radiobuttoneventlistener(radio1, radio2, id, div){

    booktemp = myLibrary.find(book => book.uid === id);

    radio1.addEventListener("click",()=>
    {
        booktemp.togglereadstatus("read");
        div.classList.add("statuscolor-green");
        div.classList.remove("statuscolor-red");
    })

    radio2.addEventListener("click",()=>
    {
        booktemp.togglereadstatus("notread");
        div.classList.add("statuscolor-red");
        div.classList.remove("statuscolor-green");
    })
}

function showradiobutton(uid, readcheck){

    const radio1 = document.createElement("input");
    radio1.type = "radio";
    radio1.name = `read-status-${uid}`;
    radio1.id = `read-${uid}`;
    radio1.classList.add("radiobutton-styling");
    
    const label1 = document.createElement("label");
    label1.setAttribute('for',`read-${uid}`);
    label1.textContent = "Read";

    const radio2 = document.createElement("input");
    radio2.type = "radio";
    radio2.name = `read-status-${uid}`;
    radio2.id = `notread-${uid}`;
    radio2.classList.add("radiobutton-styling");

    const label2 = document.createElement("label");
    label2.setAttribute('for',`notread-${uid}`);
    label2.textContent = "Not Read";



    // wrapping for css 
    const div = document.createElement("div");
    div.append(radio1, label1, radio2, label2);
    div.classList.add("radio-flex");
    statuslist.append(div);



    if(readcheck == "read")
    {
        document.getElementById(`read-${uid}`).checked = true;
        div.classList.add("statuscolor-green");
        div.classList.remove("statuscolor-red");
    }
    else{
        document.getElementById(`notread-${uid}`).checked = true;
        div.classList.remove("statuscolor-green");
        div.classList.add("statuscolor-red");
    }

    radiobuttoneventlistener(radio1, radio2, uid, div);

}


// deleting book

removelist.addEventListener("click",(e)=>{
    if (e.target.tagName === "INPUT"){

        const del_id = e.target.dataset.id;
        myLibrary = myLibrary.filter(book => book.uid !== del_id);
        display();
    } 
})



function deletebook(id){

    const delbutton = document.createElement("input");
    delbutton.type = "button";
    delbutton.dataset.id = id;
    delbutton.value = "DELETE BOOK";
    delbutton.classList.add("button_style");

    const delete_div = document.createElement("div");
    delete_div.append(delbutton)
    delete_div.classList.add("delete-flex")
    removelist.append(delete_div);
}


function display(){
    bookslist.innerHTML = ""
    authorlist.innerHTML = ""
    pagelist.innerHTML = ""
    statuslist.innerHTML = ""
    removelist.innerHTML = ""
    myLibrary.forEach(e => {

        const booktag = document.createElement("h2");
        const authortag = document.createElement("h2");
        const pagetag = document.createElement("h2");

        booktag.innerHTML = e.bookname;
        authortag.innerHTML = e.authorname;
        pagetag.innerHTML = e.pagecount;

        bookslist.append(booktag);
        authorlist.append(authortag);
        pagelist.append(pagetag);

        //styling

        const elements_styling = [booktag,authortag,pagetag];
        elements_styling.forEach(element => {
            element.classList.add("basic-styling");
            if ( element != pagetag ){
                element.classList.add("fancytext");
            }
        });
        
        deletebook(e.uid);
        showradiobutton(e.uid, e.readcheck);
    });
}