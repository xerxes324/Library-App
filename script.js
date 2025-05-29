let bookslist = document.getElementById("bookslist");
let authorlist = document.getElementById("authorlist");
let pagelist = document.getElementById("pagelist");

const myLibrary = [];

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


function display(){
    bookslist.innerHTML = ""
    authorlist.innerHTML = ""
    pagelist.innerHTML = ""
    
    myLibrary.forEach(e => {
        const booktag = document.createElement("h2");
        const authortag = document.createElement("h2");
        const pagetag = document.createElement("h2");

        //styling

        const elements_styling = [booktag,authortag,pagetag];
        elements_styling.forEach(element => {
            element.classList.add("basic-styling");
            if ( element != pagetag ){
                element.classList.add("fancytext");
            }
        });

        booktag.innerHTML = e.bookname;
        authortag.innerHTML = e.authorname;
        pagetag.innerHTML = e.pagecount;

        bookslist.append(booktag);
        authorlist.append(authortag);
        pagelist.append(pagetag);
    });
}


//styling


// addbutton.addEventListener("click", ()=>
// {
//     addBook();
//     displaybook();
// });

// let bookscontainer = document.getElementById("books");
// let authorcontainer = document.getElementById("author");
// let pagecontainer = document.getElementById("pages");

// function displaybook()
// {
//     bookscontainer.innerHTML = "";
//     authorcontainer.innerHTML = "";
//     pagecontainer.innerHTML = "";

//     myLibrary.forEach(e => {
//         const bookdiv = document.createElement("div");
//         // div.style.color = "blue";
//         bookdiv.style.fontSize = "35px";
//         bookdiv.innerHTML = e.bookname;
//         bookscontainer.append(bookdiv);
        
//         const authordiv = document.createElement("div");
//         authordiv.style.fontSize = "35px";
//         authordiv.innerHTML = e.author;
//         authorcontainer.append(authordiv);

//         const pagediv = document.createElement("div");
//         pagediv.style.fontSize = "35px";
//         pagediv.innerHTML = e.pages;
//         pagecontainer.append(pagediv);
//     });
// }

// bookslist.innerHTML += bookname;
// authorlist.innerHTML += authorname;
// pagelist.innerHTML += pagecount;

// if(readcheck){ // selected radio button:
//     authorlist.innerHTML = "Hello there";
// }

// else{

// }