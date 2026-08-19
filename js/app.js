/* ==========================================================
   YUELLA BILL TRACKER
   MAIN APPLICATION JAVASCRIPT
========================================================== */

/* ==========================================================
   APP INITIALIZATION
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        initializeNavigation();


        /* ==================================================
           RESTORE ACTIVE PAGE
        ================================================== */

        const activePage =
            sessionStorage.getItem(
                "yuellaActivePage"
            );


        /* ==================================================
           LOAD EXPENSES AFTER REFRESH
        ================================================== */

        if(
            activePage ===
            "expensesPage"
        ){

            await loadExpensesPage();

        }

    }
);

/* ==========================================================
   NAVIGATION
========================================================== */

function initializeNavigation(){

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    const pages =
        document.querySelectorAll(
            ".app-page"
        );


    if(
        !navItems.length ||
        !pages.length
    ){

        return;

    }


    /* ======================================================
       NAVIGATION FUNCTION
    ====================================================== */

    function navigateToPage(
        targetPage
    ){

        if(!targetPage){

            return;

        }


        /* ==================================================
           SAVE CURRENT PAGE
        ================================================== */

        sessionStorage.setItem(
            "yuellaActivePage",
            targetPage
        );


        /* ==================================================
           REMOVE ACTIVE FROM ALL NAV ITEMS
        ================================================== */

        navItems.forEach(
            item => {

                item.classList.remove(
                    "active"
                );

            }
        );


        /* ==================================================
           REMOVE ACTIVE FROM ALL PAGES
        ================================================== */

        pages.forEach(
            page => {

                page.classList.remove(
                    "active"
                );

            }
        );


        /* ==================================================
           ACTIVATE TARGET PAGE
        ================================================== */

        const page =
            document.getElementById(
                targetPage
            );


        if(!page){

            console.error(
                "Navigation page not found:",
                targetPage
            );

            return;

        }


        page.classList.add(
            "active"
        );


/* ==================================================
   LOAD EXPENSES PAGE
================================================== */

if(
    targetPage ===
    "expensesPage"
){

    if(
        typeof window.loadExpensesPage ===
        "function"
    ){

        window.loadExpensesPage();

    }

}

/* ==================================================
   LOAD REPORTS PAGE
================================================== */

if(
    targetPage ===
    "reportsPage"
){

    if(
        typeof window.loadReports ===
        "function"
    ){

        window.loadReports();

    }

}

        /* ==================================================
           ACTIVATE MATCHING NAV ITEM
        ================================================== */

        navItems.forEach(
            item => {

                if(
                    item.dataset.page ===
                    targetPage
                ){

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

        /* ==================================================
           SCROLL TO TOP
        ================================================== */

        window.scrollTo(
            {
                top:0,
                behavior:"instant"
            }
        );

    }


/* ======================================================
   BOTTOM NAV ITEMS
====================================================== */

navItems.forEach(
    navItem => {

        navItem.addEventListener(
            "click",
            async () => {

                const targetPage =
                    navItem.dataset.page;


                navigateToPage(
                    targetPage
                );


                /* ==========================================
                   LOAD EXPENSES WHEN EXPENSES NAV IS CLICKED
                ========================================== */

                if(
                    targetPage ===
                    "expensesPage"
                ){

                    await loadExpensesPage();

                }

            }
        );

    }
);

/* ======================================================
   PDF REPORTS → BACK TO SETTINGS
====================================================== */

const pdfReportsBackButton =
    document.getElementById(
        "pdfReportsBackButton"
    );


if(
    pdfReportsBackButton
){

    pdfReportsBackButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            /* ==========================================
               USE EXISTING APP NAVIGATION
            ========================================== */

            const settingsNavItem =
                document.querySelector(
                    '.nav-item[data-page="settingsPage"]'
                );


            if(
                settingsNavItem
            ){

                settingsNavItem.click();

            }

        }
    );

}

/* ======================================================
   PDF REPORTS SETTINGS BUTTON
====================================================== */

const pdfSetting =
    document.getElementById(
        "pdfSetting"
    );


if(pdfSetting){

    pdfSetting.addEventListener(
        "click",
        event => {

            event.preventDefault();

            const targetPage =
                pdfSetting.dataset.page;


            if(!targetPage){

                return;

            }


            /* ==========================================
               SAVE ACTIVE PAGE
            ========================================== */

            sessionStorage.setItem(
                "yuellaActivePage",
                targetPage
            );


            /* ==========================================
               HIDE ALL PAGES
            ========================================== */

            pages.forEach(
                page => {

                    page.classList.remove(
                        "active"
                    );

                }
            );


            /* ==========================================
               SHOW PDF REPORTS PAGE
            ========================================== */

            const pdfReportsPage =
                document.getElementById(
                    targetPage
                );


            if(pdfReportsPage){

    pdfReportsPage.classList.add(
        "active"
    );


    /* ==========================================
       LOAD PDF REPORTS
    ========================================== */

    if(
        typeof window.loadPDFReports ===
        "function"
    ){

        window.loadPDFReports();

    }

}


            /* ==========================================
               REMOVE NAV ACTIVE
            ========================================== */

            navItems.forEach(
                item => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            /* ==========================================
               SCROLL TOP
            ========================================== */

            window.scrollTo(
                {
                    top:0,
                    behavior:"instant"
                }
            );

        }
    );

}

    /* ======================================================
       DASHBOARD VIEW ALL
    ====================================================== */

    const viewAllButtons =
        document.querySelectorAll(
            "#homePage .section-link"
        );


    viewAllButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    const targetPage =
                        button.dataset.page;


                    navigateToPage(
                        targetPage
                    );

                }
            );

        }
    );

}

/* ==========================================================
   GLOBAL APP OBJECT
========================================================== */

window.YuellaApp = {

    name:
        "YUella Bill Tracker",

    version:
        "1.0.0",

    supportedCurrencies: [

        "JPY",

        "PHP"

    ],

    supportedLanguages: [

        "en",

        "jp"

    ]

};

/* ==========================================================
   ADD EXPENSE NAVIGATION
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeAddExpenseNavigation();

    }
);

 /* ==========================================================
   OPEN / CLOSE ADD EXPENSE
========================================================== */

function initializeAddExpenseNavigation(){

    const addExpenseButton =
        document.getElementById(
            "addExpenseButton"
        );


    const expensesAddButton =
        document.getElementById(
            "expensesAddButton"
        );


    const addExpensePage =
        document.getElementById(
            "addExpensePage"
        );


    const expensesPage =
        document.getElementById(
            "expensesPage"
        );


    const cancelButton =
        document.getElementById(
            "cancelExpenseButton"
        );


    const bottomNavAddExpense =
        document.getElementById(
            "bottomNavAddExpense"
        );


    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    /* ======================================================
       OPEN ADD EXPENSE
    ====================================================== */

    function openAddExpense(){

        if(!addExpensePage){

            return;

        }


        /*
         * Hide all pages
         */

        document
            .querySelectorAll(
                ".app-page"
            )
            .forEach(
                page => {

                    page.classList.remove(
                        "active"
                    );

                }
            );


        /*
         * Show Add Expense
         */

        addExpensePage.classList.add(
            "active"
        );


        /*
         * Remove bottom-nav active state
         */

        navItems.forEach(
            item => {

                item.classList.remove(
                    "active"
                );

            }
        );


        /*
         * Scroll to top
         */

        window.scrollTo(
            {
                top:0,
                behavior:"instant"
            }
        );

    }


    /* ======================================================
       CLOSE ADD EXPENSE
    ====================================================== */

    function closeAddExpense(){

        if(!addExpensePage){

            return;

        }


        addExpensePage.classList.remove(
            "active"
        );


        if(expensesPage){

            expensesPage.classList.add(
                "active"
            );

        }


        /*
         * Activate Expenses navigation
         */

        navItems.forEach(
            item => {

                item.classList.remove(
                    "active"
                );


                if(
                    item.dataset.page ===
                    "expensesPage"
                ){

                    item.classList.add(
                        "active"
                    );

                }

            }
        );


        /*
         * Scroll to top
         */

        window.scrollTo(
            {
                top:0,
                behavior:"instant"
            }
        );

    }


    /* ======================================================
       DASHBOARD ADD BUTTON
    ====================================================== */

    if(addExpenseButton){

        addExpenseButton.addEventListener(
            "click",
            openAddExpense
        );

    }


    /* ======================================================
       EXPENSES PAGE ADD BUTTON
    ====================================================== */

    if(expensesAddButton){

        expensesAddButton.addEventListener(
            "click",
            openAddExpense
        );

    }


    /* ======================================================
       BOTTOM NAV ADD EXPENSE
    ====================================================== */

    if(bottomNavAddExpense){

        bottomNavAddExpense.addEventListener(
            "click",
            openAddExpense
        );

    }


    /* ======================================================
       CANCEL BUTTON
    ====================================================== */

    if(cancelButton){

        cancelButton.addEventListener(
            "click",
            closeAddExpense
        );

    }

}

/* ==========================================================
   EXPENSE COUNTRY / CATEGORY FILTER
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeExpenseCategoryFilter();

    }
);

/* ==========================================================
   CATEGORY FILTER
========================================================== */

function initializeExpenseCategoryFilter(){

    const countrySelect =
        document.getElementById(
            "expenseCountry"
        );

    const categorySelect =
        document.getElementById(
            "expenseCategory"
        );

    if(
        !countrySelect ||
        !categorySelect
    ){

        return;

    }

    /*
     * Store the original category options
     */

    const categories = {

        JP: [

            {
                value: "house",
                text: "House"
            },

            {
                value: "water",
                text: "Water"
            },

            {
                value: "gas",
                text: "Gas"
            },

            {
                value: "electricity",
                text: "Electricity"
            },

            {
                value: "food",
                text: "Food"
            },

            {
                value: "tax",
                text: "Tax"
            },

            {
               value: "insurance",
               text: "Insurance"
            },

            {
               value: "others",
               text: "Others"
            }

        ],

        PH: [

            {
                value: "condo_rent",
                text: "Condo Rent"
            },

            {
                value: "food",
                text: "Food"
            },

            {
                value: "electricity",
                text: "Electricity"
            },

            {
                value: "internet",
                text: "Internet"
            },

            {
                value: "water",
                text: "Water"
            },

           {
                value: "others",
                text: "Others"
           }

        ]

    };

    /* ======================================================
       UPDATE CATEGORY
    ====================================================== */

    function updateCategories(){

        const country =
            countrySelect.value;

        /*
         * Reset category
         */

        categorySelect.innerHTML = "";

        /*
         * Default option
         */

        const defaultOption =
            document.createElement(
                "option"
            );

        defaultOption.value =
            "";

        defaultOption.textContent =
            "Select category";

        defaultOption.disabled =
            true;

        defaultOption.selected =
            true;

        categorySelect.appendChild(
            defaultOption
        );

        /*
         * No country selected
         */

        if(
            !categories[country]
        ){

            return;

        }

        /*
         * Add country categories
         */

        categories[country].forEach(
            category => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    category.value;

                option.textContent =
                    category.text;

                categorySelect.appendChild(
                    option
                );

            }
        );

    }

    /* ======================================================
       COUNTRY CHANGE
    ====================================================== */

    countrySelect.addEventListener(
        "change",
        updateCategories
    );

    /*
     * Initial state
     */

    updateCategories();

}

/* ==========================================================
   EXPENSE COUNTRY / CURRENCY
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeExpenseCurrency();

    }
);

/* ==========================================================
   CURRENCY AUTO SELECT
========================================================== */

function initializeExpenseCurrency(){

    const countrySelect =
        document.getElementById(
            "expenseCountry"
        );

    const currencySelect =
        document.getElementById(
            "expenseCurrency"
        );

    if(
        !countrySelect ||
        !currencySelect
    ){

        return;

    }

    /* ======================================================
       COUNTRY CHANGE
    ====================================================== */

    countrySelect.addEventListener(
        "change",
        () => {

            const country =
                countrySelect.value;

            if(country === "JP"){

                currencySelect.value =
                    "JPY";

            }

            else if(country === "PH"){

                currencySelect.value =
                    "PHP";

            }

            else{

                currencySelect.value =
                    "";

            }

        }
    );

}

/* ==========================================================
   EXPENSE DATE — COUNTRY TIMEZONE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeExpenseDate();

    }
);


/* ==========================================================
   INITIALIZE EXPENSE DATE
========================================================== */

function initializeExpenseDate(){

    const countrySelect =
        document.getElementById(
            "expenseCountry"
        );

    const expenseDate =
        document.getElementById(
            "expenseDate"
        );

    const dueDate =
        document.getElementById(
            "expenseDueDate"
        );


    if(
        !countrySelect ||
        !expenseDate
    ){

        return;

    }

    /* ======================================================
       GET DATE FOR COUNTRY
    ====================================================== */

    function getCountryDate(
        country
    ){

        let timeZone;

        if(country === "JP"){

            timeZone =
                "Asia/Tokyo";

        }

        else if(country === "PH"){

            timeZone =
                "Asia/Manila";

        }

        else{

            return "";

        }

        const formatter =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone:
                        timeZone,

                    year:
                        "numeric",

                    month:
                        "2-digit",

                    day:
                        "2-digit"
                }
            );

        return formatter.format(
            new Date()
        );

    }

    /* ======================================================
       COUNTRY CHANGE
    ====================================================== */

    countrySelect.addEventListener(
        "change",
        () => {

            const country =
                countrySelect.value;

            const today =
                getCountryDate(
                    country
                );

            if(today){

                expenseDate.value =
                    today;

            }

        }
    );

}

/* ==========================================================
   EXPENSE DATE — COUNTRY TIMEZONE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeExpenseDate();

    }
);


/* ==========================================================
   INITIALIZE EXPENSE DATE
========================================================== */

function initializeExpenseDate(){

    const countrySelect =
        document.getElementById(
            "expenseCountry"
        );


    const expenseDate =
        document.getElementById(
            "expenseDate"
        );


    if(
        !countrySelect ||
        !expenseDate
    ){

        return;

    }


    /* ======================================================
       GET DATE FOR COUNTRY
    ====================================================== */

    function getCountryDate(
        country
    ){

        let timeZone;


        if(country === "JP"){

            timeZone =
                "Asia/Tokyo";

        }

        else if(country === "PH"){

            timeZone =
                "Asia/Manila";

        }

        else{

            return "";

        }


        const formatter =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone:
                        timeZone,

                    year:
                        "numeric",

                    month:
                        "2-digit",

                    day:
                        "2-digit"
                }
            );


        return formatter.format(
            new Date()
        );

    }


    /* ======================================================
       SET INITIAL DATE
    ====================================================== */

    if(countrySelect.value){

        const today =
            getCountryDate(
                countrySelect.value
            );


        if(today){

            expenseDate.value =
                today;

        }

    }


    /* ======================================================
       COUNTRY CHANGE
    ====================================================== */

    countrySelect.addEventListener(
        "change",
        () => {

            const country =
                countrySelect.value;


            const today =
                getCountryDate(
                    country
                );


            if(today){

                expenseDate.value =
                    today;

            }

        }
    );

}


/* ==========================================================
   ADD EXPENSE FORM
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeExpenseForm();

    }
);

/* ==========================================================
   INITIALIZE EXPENSE FORM
========================================================== */

function initializeExpenseForm(){

    const form =
        document.getElementById(
            "expenseForm"
        );


    if(!form){

        return;

    }


    /* ======================================================
       SUBMIT FORM
    ====================================================== */

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /* ==================================================
               GET FORM VALUES
            ================================================== */

            const country =
                document.getElementById(
                    "expenseCountry"
                )?.value;


            const category =
                document.getElementById(
                    "expenseCategory"
                )?.value;


            const otherInput =
                document.getElementById(
                    "expenseOther"
                )?.value.trim();


            const expenseName =
                otherInput ||
                category;


            const amount =
                document.getElementById(
                    "expenseAmount"
                )?.value;


            const currency =
                document.getElementById(
                    "expenseCurrency"
                )?.value;


            const expenseDate =
                document.getElementById(
                    "expenseDate"
                )?.value;


            const status =
                document.getElementById(
                    "expenseStatus"
                )?.value;


            const notes =
                document.getElementById(
                    "expenseNotes"
                )?.value.trim();


            /* ==================================================
               REQUIRED VALIDATION
            ================================================== */

            if(!country){

                alert(
                    "Please select a country."
                );

                return;

            }


            if(!category){

                alert(
                    "Please select a category."
                );

                return;

            }


            if(!expenseName){

                alert(
                    "Please enter an expense."
                );

                return;

            }


            if(
                !amount ||
                Number(amount) <= 0
            ){

                alert(
                    "Please enter a valid amount."
                );

                return;

            }


            if(!currency){

                alert(
                    "Please select a currency."
                );

                return;

            }


            if(!expenseDate){

                alert(
                    "Please select the expense date."
                );

                return;

            }


            if(!status){

                alert(
                    "Please select the payment status."
                );

                return;

            }


            /* ==================================================
               COUNTRY / CURRENCY VALIDATION
            ================================================== */

            if(
                country === "JP" &&
                currency !== "JPY"
            ){

                alert(
                    "Japan expenses must use JPY."
                );

                return;

            }


            if(
                country === "PH" &&
                currency !== "PHP"
            ){

                alert(
                    "Philippines expenses must use PHP."
                );

                return;

            }


            /* ==================================================
               CHECK SUPABASE
            ================================================== */

            if(
                typeof supabaseClient ===
                "undefined"
            ){

                alert(
                    "Supabase connection is not available."
                );

                return;

            }


            /* ==================================================
               GET CURRENT USER
            ================================================== */

            const {
                data: userData,
                error: userError
            } =
                await supabaseClient.auth.getUser();


            if(userError){

                console.error(
                    "Get user error:",
                    userError
                );

                alert(
                    "Unable to verify your account."
                );

                return;

            }


            const user =
                userData?.user;


            if(!user){

                alert(
                    "Please log in first."
                );

                return;

            }


            /* ==================================================
               PREPARE DATA
            ================================================== */

            const expenseData = {

                user_id:
                    user.id,

                expense_name:
                    expenseName,

                country:
                    country,

                category:
                    category,

                other_input:
                    otherInput ||
                    null,

                amount:
                    Number(amount),

                currency:
                    currency,

                expense_date:
                    expenseDate,

                status:
                    status,

                notes:
                    notes ||
                    null

            };


            console.log(
                "Yuella Expense Data:",
                expenseData
            );


            /* ==================================================
               CHECK EDIT MODE
            ================================================== */

            const editingExpenseId =
                window.editingExpenseId;


            let data;
            let error;


            /* ==================================================
               UPDATE EXISTING EXPENSE
            ================================================== */

            if(editingExpenseId){

                const result =
                    await supabaseClient
                        .from("expenses")
                        .update(
                            expenseData
                        )
                        .eq(
                            "id",
                            editingExpenseId
                        )
                        .eq(
                            "user_id",
                            user.id
                        )
                        .select()
                        .single();


                data =
                    result.data;

                error =
                    result.error;

            }


            /* ==================================================
               INSERT NEW EXPENSE
            ================================================== */

            else{

                const result =
                    await supabaseClient
                        .from("expenses")
                        .insert(
                            expenseData
                        )
                        .select()
                        .single();


                data =
                    result.data;

                error =
                    result.error;

            }


            /* ==================================================
               SAVE ERROR
            ================================================== */

            if(error){

                console.error(
                    "Save expense error:",
                    error
                );

                alert(
                    "Failed to save expense.\n\n" +
                    error.message
                );

                return;

            }


            /* ==================================================
               SUCCESS MESSAGE
            ================================================== */

            if(editingExpenseId){

                console.log(
                    "Yuella Expense updated successfully:",
                    data
                );

                alert(
                    "Expense updated successfully."
                );

            }

            else{

                console.log(
                    "Yuella Expense saved successfully:",
                    data
                );

                alert(
                    "Expense saved successfully."
                );

            }


            /* ==================================================
               CLEAR EDIT MODE
            ================================================== */

            window.editingExpenseId =
                null;


            /* ==================================================
               RESET FORM
            ================================================== */

            form.reset();


            /* ==================================================
               RESET SAVE BUTTON
            ================================================== */

            const saveButton =
                document.getElementById(
                    "saveExpenseButton"
                );


            if(saveButton){

                saveButton.textContent =
                    "Save Expense";

            }


            /* ==================================================
               RESET PAGE TITLE
            ================================================== */

            const addExpensePage =
                document.getElementById(
                    "addExpensePage"
                );


            const addExpenseTitle =
                addExpensePage?.querySelector(
                    ".page-header h1"
                );


            if(addExpenseTitle){

                addExpenseTitle.textContent =
                    "Add Expense";

            }


/* ==================================================
   REFRESH DASHBOARD
================================================== */

if(
    typeof loadDashboardData ===
    "function"
){

    await loadDashboardData();

}


/* ==================================================
   REFRESH RECENT EXPENSES
================================================== */

if(
    typeof loadRecentExpenses ===
    "function"
){

    await loadRecentExpenses();

}


/* ==================================================
   REFRESH EXPENSES PAGE
================================================== */

if(
    typeof loadExpensesPage ===
    "function"
){

    await loadExpensesPage();

}

            /* ==================================================
               HIDE ALL PAGES
            ================================================== */

            document
                .querySelectorAll(
                    ".app-page"
                )
                .forEach(
                    page => {

                        page.classList.remove(
                            "active"
                        );

                    }
                );


            /* ==================================================
               SHOW EXPENSES PAGE
            ================================================== */

            const expensesPage =
                document.getElementById(
                    "expensesPage"
                );


            if(expensesPage){

                expensesPage.classList.add(
                    "active"
                );

            }


            /* ==================================================
               UPDATE NAVIGATION
            ================================================== */

            document
                .querySelectorAll(
                    ".nav-item"
                )
                .forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );


                        if(
                            item.dataset.page ===
                            "expensesPage"
                        ){

                            item.classList.add(
                                "active"
                            );

                        }

                    }
                );


            /* ==================================================
               SAVE ACTIVE PAGE
            ================================================== */

            sessionStorage.setItem(
                "yuellaActivePage",
                "expensesPage"
            );

        }
    );

}

/* ==========================================================
   YUELLA BILL TRACKER
   REGISTER ACCOUNT
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeRegistration();

    }
);


/* ==========================================================
   INITIALIZE REGISTRATION
========================================================== */

function initializeRegistration(){

    const registerForm =
        document.getElementById(
            "registerForm"
        );


    if(!registerForm){

        return;

    }


    registerForm.addEventListener(
        "submit",
        handleRegistration
    );

}


/* ==========================================================
   HANDLE REGISTRATION
========================================================== */

async function handleRegistration(event){

    event.preventDefault();


    const usernameInput =
        document.getElementById(
            "registerUsername"
        );

    const passwordInput =
        document.getElementById(
            "registerPassword"
        );

    const confirmPasswordInput =
        document.getElementById(
            "registerConfirmPassword"
        );

    const registerButton =
        document.getElementById(
            "registerButton"
        );

    const registerMessage =
        document.getElementById(
            "registerMessage"
        );


    if(
        !usernameInput ||
        !passwordInput ||
        !confirmPasswordInput
    ){

        return;

    }


    const username =
        usernameInput.value
            .trim()
            .toLowerCase();

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;


    /* ======================================================
       CLEAR MESSAGE
    ====================================================== */

    if(registerMessage){

        registerMessage.textContent = "";

    }


    /* ======================================================
       VALIDATE USERNAME
    ====================================================== */

    if(username.length < 3){

        showRegisterMessage(
            "Username must be at least 3 characters."
        );

        return;

    }


    /* ======================================================
       VALIDATE USERNAME CHARACTERS
    ====================================================== */

    const usernamePattern =
        /^[a-zA-Z0-9._]+$/;


    if(
        !usernamePattern.test(
            username
        )
    ){

        showRegisterMessage(
            "Username can only contain letters, numbers, dots, and underscores."
        );

        return;

    }


    /* ======================================================
       VALIDATE PASSWORD
    ====================================================== */

    if(password.length < 6){

        showRegisterMessage(
            "Password must be at least 6 characters."
        );

        return;

    }


    /* ======================================================
       CONFIRM PASSWORD
    ====================================================== */

    if(password !== confirmPassword){

        showRegisterMessage(
            "Passwords do not match."
        );

        return;

    }


    /* ======================================================
       CHECK SUPABASE
    ====================================================== */

    if(
        typeof supabaseClient ===
        "undefined"
    ){

        showRegisterMessage(
            "Supabase connection is not available."
        );

        return;

    }


    try{

        /* ==================================================
           CHECK USERNAME
        ================================================== */

        const {
            data: existingProfile,
            error: usernameError
        } =
            await supabaseClient
                .from("profiles")
                .select("id")
                .eq(
                    "username",
                    username
                )
                .maybeSingle();


        if(usernameError){

            console.error(
                "Username check error:",
                usernameError
            );

            showRegisterMessage(
                "Unable to check username."
            );

            return;

        }


        if(existingProfile){

            showRegisterMessage(
                "Username is already taken."
            );

            return;

        }


        /* ==================================================
           INTERNAL AUTH IDENTITY
        ================================================== */

        const internalEmail =
            `${username}@yuella.local`;


        /* ==================================================
           DISABLE BUTTON
        ================================================== */

        if(registerButton){

            registerButton.disabled = true;

            registerButton.textContent =
                "Creating Account...";

        }


        /* ==================================================
           CREATE SUPABASE AUTH USER
        ================================================== */

        const {
            data: authData,
            error: authError
        } =
            await supabaseClient.auth.signUp({

                email:
                    internalEmail,

                password:
                    password

            });


        if(authError){

            console.error(
                "Registration error:",
                authError
            );

            showRegisterMessage(
                authError.message
            );

            return;

        }


        /* ==================================================
           GET USER
        ================================================== */

        const user =
            authData?.user;


        if(!user){

            showRegisterMessage(
                "Account creation failed."
            );

            return;

        }


        /* ==================================================
           CREATE PROFILE
        ================================================== */

        const {
            error: profileError
        } =
            await supabaseClient
                .from("profiles")
                .insert({

                    id:
                        user.id,

                    username:
                        username

                });


        if(profileError){

            console.error(
                "Profile creation error:",
                profileError
            );

            showRegisterMessage(
                "Account created, but profile setup failed."
            );

            return;

        }


        /* ==================================================
           SUCCESS
        ================================================== */

        showRegisterMessage(
            "Account created successfully."
        );


        registerForm.reset();


        /* ==================================================
           RETURN TO LOGIN
        ================================================== */

        setTimeout(
            () => {

                const registerPage =
                    document.getElementById(
                        "registerPage"
                    );

                const loginPage =
                    document.getElementById(
                        "loginPage"
                    );


                if(registerPage){

                    registerPage.classList.remove(
                        "active"
                    );

                }


                if(loginPage){

                    loginPage.classList.add(
                        "active"
                    );

                }

            },
            1000
        );


    }

    catch(error){

        console.error(
            "Unexpected registration error:",
            error
        );

        showRegisterMessage(
            "Something went wrong. Please try again."
        );

    }

    finally{

        if(registerButton){

            registerButton.disabled = false;

            registerButton.textContent =
                "Create Account";

        }

    }

}


/* ==========================================================
   REGISTER MESSAGE
========================================================== */

function showRegisterMessage(
    message
){

    const registerMessage =
        document.getElementById(
            "registerMessage"
        );


    if(registerMessage){

        registerMessage.textContent =
            message;

    }

}/* ==========================================================
   YUELLA BILL TRACKER
   REGISTER ACCOUNT
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeRegistration();

    }
);


/* ==========================================================
   INITIALIZE REGISTRATION
========================================================== */

function initializeRegistration(){

    const registerForm =
        document.getElementById(
            "registerForm"
        );


    if(!registerForm){

        return;

    }


    registerForm.addEventListener(
        "submit",
        handleRegistration
    );

}


/* ==========================================================
   HANDLE REGISTRATION
========================================================== */

async function handleRegistration(event){

    event.preventDefault();


    const usernameInput =
        document.getElementById(
            "registerUsername"
        );

    const passwordInput =
        document.getElementById(
            "registerPassword"
        );

    const confirmPasswordInput =
        document.getElementById(
            "registerConfirmPassword"
        );

    const registerButton =
        document.getElementById(
            "registerButton"
        );

    const registerMessage =
        document.getElementById(
            "registerMessage"
        );


    if(
        !usernameInput ||
        !passwordInput ||
        !confirmPasswordInput
    ){

        return;

    }


    const username =
        usernameInput.value
            .trim()
            .toLowerCase();

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;


    /* ======================================================
       CLEAR MESSAGE
    ====================================================== */

    if(registerMessage){

        registerMessage.textContent = "";

    }


    /* ======================================================
       VALIDATE USERNAME
    ====================================================== */

    if(username.length < 3){

        showRegisterMessage(
            "Username must be at least 3 characters."
        );

        return;

    }


    /* ======================================================
       VALIDATE USERNAME CHARACTERS
    ====================================================== */

    const usernamePattern =
        /^[a-zA-Z0-9._]+$/;


    if(
        !usernamePattern.test(
            username
        )
    ){

        showRegisterMessage(
            "Username can only contain letters, numbers, dots, and underscores."
        );

        return;

    }


    /* ======================================================
       VALIDATE PASSWORD
    ====================================================== */

    if(password.length < 6){

        showRegisterMessage(
            "Password must be at least 6 characters."
        );

        return;

    }


    /* ======================================================
       CONFIRM PASSWORD
    ====================================================== */

    if(password !== confirmPassword){

        showRegisterMessage(
            "Passwords do not match."
        );

        return;

    }


    /* ======================================================
       CHECK SUPABASE
    ====================================================== */

    if(
        typeof supabaseClient ===
        "undefined"
    ){

        showRegisterMessage(
            "Supabase connection is not available."
        );

        return;

    }


    try{

        /* ==================================================
           CHECK USERNAME
        ================================================== */

        const {
            data: existingProfile,
            error: usernameError
        } =
            await supabaseClient
                .from("profiles")
                .select("id")
                .eq(
                    "username",
                    username
                )
                .maybeSingle();


        if(usernameError){

            console.error(
                "Username check error:",
                usernameError
            );

            showRegisterMessage(
                "Unable to check username."
            );

            return;

        }


        if(existingProfile){

            showRegisterMessage(
                "Username is already taken."
            );

            return;

        }


        /* ==================================================
           INTERNAL AUTH IDENTITY
        ================================================== */

        const internalEmail =
            `${username}@yuella.local`;


        /* ==================================================
           DISABLE BUTTON
        ================================================== */

        if(registerButton){

            registerButton.disabled = true;

            registerButton.textContent =
                "Creating Account...";

        }


        /* ==================================================
           CREATE SUPABASE AUTH USER
        ================================================== */

        const {
            data: authData,
            error: authError
        } =
            await supabaseClient.auth.signUp({

                email:
                    internalEmail,

                password:
                    password

            });


        if(authError){

            console.error(
                "Registration error:",
                authError
            );

            showRegisterMessage(
                authError.message
            );

            return;

        }


        /* ==================================================
           GET USER
        ================================================== */

        const user =
            authData?.user;


        if(!user){

            showRegisterMessage(
                "Account creation failed."
            );

            return;

        }


        /* ==================================================
           CREATE PROFILE
        ================================================== */

        const {
            error: profileError
        } =
            await supabaseClient
                .from("profiles")
                .insert({

                    id:
                        user.id,

                    username:
                        username

                });


        if(profileError){

            console.error(
                "Profile creation error:",
                profileError
            );

            showRegisterMessage(
                "Account created, but profile setup failed."
            );

            return;

        }


        /* ==================================================
           SUCCESS
        ================================================== */

        showRegisterMessage(
            "Account created successfully."
        );


        registerForm.reset();


        /* ==================================================
           RETURN TO LOGIN
        ================================================== */

        setTimeout(
            () => {

                const registerPage =
                    document.getElementById(
                        "registerPage"
                    );

                const loginPage =
                    document.getElementById(
                        "loginPage"
                    );


                if(registerPage){

                    registerPage.classList.remove(
                        "active"
                    );

                }


                if(loginPage){

                    loginPage.classList.add(
                        "active"
                    );

                }

            },
            1000
        );


    }

    catch(error){

        console.error(
            "Unexpected registration error:",
            error
        );

        showRegisterMessage(
            "Something went wrong. Please try again."
        );

    }

    finally{

        if(registerButton){

            registerButton.disabled = false;

            registerButton.textContent =
                "Create Account";

        }

    }

}


/* ==========================================================
   REGISTER MESSAGE
========================================================== */

function showRegisterMessage(
    message
){

    const registerMessage =
        document.getElementById(
            "registerMessage"
        );


    if(registerMessage){

        registerMessage.textContent =
            message;

    }

}

/* ==========================================================
   YUELLA BILL TRACKER
   LOGIN / REGISTER PAGE SWITCHING
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeAuthNavigation();

    }
);


/* ==========================================================
   AUTH NAVIGATION
========================================================== */

function initializeAuthNavigation(){

    const loginPage =
        document.getElementById(
            "loginPage"
        );

    const registerPage =
        document.getElementById(
            "registerPage"
        );

    const showRegisterButton =
        document.getElementById(
            "showRegisterButton"
        );

    const showLoginButton =
        document.getElementById(
            "showLoginButton"
        );


    /* ======================================================
       LOGIN → REGISTER
    ====================================================== */

    if(showRegisterButton){

        showRegisterButton.addEventListener(
            "click",
            () => {

                if(loginPage){

                    loginPage.classList.remove(
                        "active"
                    );

                }


                if(registerPage){

                    registerPage.classList.add(
                        "active"
                    );

                }


                window.scrollTo(
                    {
                        top:0,
                        behavior:"instant"
                    }
                );

            }
        );

    }


    /* ======================================================
       REGISTER → LOGIN
    ====================================================== */

    if(showLoginButton){

        showLoginButton.addEventListener(
            "click",
            () => {

                if(registerPage){

                    registerPage.classList.remove(
                        "active"
                    );

                }


                if(loginPage){

                    loginPage.classList.add(
                        "active"
                    );

                }


                window.scrollTo(
                    {
                        top:0,
                        behavior:"instant"
                    }
                );

            }
        );

    }

}

/* ==========================================================
   YUELLA BILL TRACKER
   LOGIN
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeLogin();

    }
);


/* ==========================================================
   INITIALIZE LOGIN
========================================================== */

function initializeLogin(){

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if(!loginForm){

        return;

    }


    loginForm.addEventListener(
        "submit",
        handleLogin
    );

}


/* ==========================================================
   HANDLE LOGIN
========================================================== */

async function handleLogin(event){

    event.preventDefault();


    const usernameInput =
        document.getElementById(
            "loginUsername"
        );

    const passwordInput =
        document.getElementById(
            "loginPassword"
        );

    const loginButton =
        document.getElementById(
            "loginButton"
        );


    if(
        !usernameInput ||
        !passwordInput
    ){

        return;

    }


    const username =
        usernameInput.value
            .trim()
            .toLowerCase();

    const password =
        passwordInput.value;


    showLoginMessage("");


    if(username.length < 3){

        showLoginMessage(
            "Please enter your username."
        );

        return;

    }


    if(!password){

        showLoginMessage(
            "Please enter your password."
        );

        return;

    }


    if(
        typeof supabaseClient ===
        "undefined"
    ){

        showLoginMessage(
            "Supabase connection is not available."
        );

        return;

    }


    try{

        if(loginButton){

            loginButton.disabled = true;

            loginButton.textContent =
                "Logging in...";

        }


        /*
         * The registration system uses:
         *
         * username@yuella.local
         *
         * as the INTERNAL Supabase Auth identity.
         *
         * The user only enters the username.
         */

        const internalEmail =
            `${username}@yuella.local`;


        /* ==================================================
           SUPABASE LOGIN
        ================================================== */

        const {
            data,
            error
        } =
            await supabaseClient.auth.signInWithPassword({

                email:
                    internalEmail,

                password:
                    password

            });


        if(error){

            console.error(
                "Login error:",
                error
            );

            showLoginMessage(
                "Invalid username or password."
            );

            return;

        }


        if(!data?.user){

            showLoginMessage(
                "Login failed. Please try again."
            );

            return;

        }


        /* ==================================================
           LOGIN SUCCESS
        ================================================== */

        const authContainer =
            document.getElementById(
                "authContainer"
            );

        const app =
            document.getElementById(
                "app"
            );

        const loginPage =
            document.getElementById(
                "loginPage"
            );


        if(authContainer){

            authContainer.style.display =
                "none";

        }


        if(loginPage){

            loginPage.classList.remove(
                "active"
            );

        }


        if(app){

            app.style.display =
                "block";

        }


        /* ==================================================
           SHOW HOME PAGE
        ================================================== */

        document
            .querySelectorAll(
                ".app-page"
            )
            .forEach(
                page => {

                    page.classList.remove(
                        "active"
                    );

                }
            );


        const homePage =
            document.getElementById(
                "homePage"
            );


        if(homePage){

            homePage.classList.add(
                "active"
            );

        }


        /* ==================================================
           ACTIVATE HOME NAVIGATION
        ================================================== */

        document
            .querySelectorAll(
                ".nav-item"
            )
            .forEach(
                item => {

                    item.classList.remove(
                        "active"
                    );


                    if(
                        item.dataset.page ===
                        "homePage"
                    ){

                        item.classList.add(
                            "active"
                        );

                    }

                }
            );


        window.scrollTo(
            {
                top:0,
                behavior:"instant"
            }
        );


        console.log(
            "Yuella login successful."
        );

    }

    catch(error){

        console.error(
            "Unexpected login error:",
            error
        );

        showLoginMessage(
            "Something went wrong. Please try again."
        );

    }

    finally{

        if(loginButton){

            loginButton.disabled = false;

            loginButton.textContent =
                "Login";

        }

    }

}


/* ==========================================================
   LOGIN MESSAGE
========================================================== */

function showLoginMessage(
    message
){

    const loginMessage =
        document.getElementById(
            "loginMessage"
        );


    if(loginMessage){

        loginMessage.textContent =
            message;

    }

}

/* ==========================================================
   YUELLA BILL TRACKER
   AUTH SESSION CHECK
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        checkExistingSession();

    }
);


/* ==========================================================
   CHECK EXISTING SESSION
========================================================== */

async function checkExistingSession(){

    if(
        typeof supabaseClient ===
        "undefined"
    ){

        return;

    }


    try{

        const {
            data,
            error
        } =
            await supabaseClient.auth.getSession();


        if(error){

            console.error(
                "Session check error:",
                error
            );

            showLoggedOutState();

            return;

        }


        const session =
            data?.session;


        if(session){

            showLoggedInState();

        }
        else{

            showLoggedOutState();

        }

    }

    catch(error){

        console.error(
            "Unexpected session error:",
            error
        );

        showLoggedOutState();

    }

}


/* ==========================================================
   SHOW LOGGED-IN STATE
========================================================== */

function showLoggedInState(){

    const authContainer =
        document.getElementById(
            "authContainer"
        );

    const app =
        document.getElementById(
            "app"
        );


    if(authContainer){

        authContainer.style.display =
            "none";

    }


    if(app){

        app.style.display =
            "block";

    }


    document
        .querySelectorAll(
            ".auth-page"
        )
        .forEach(
            page => {

                page.classList.remove(
                    "active"
                );

            }
        );


    document
        .querySelectorAll(
            ".app-page"
        )
        .forEach(
            page => {

                page.classList.remove(
                    "active"
                );

            }
        );


    /* ======================================================
       RESTORE LAST ACTIVE PAGE
    ====================================================== */

    const savedPage =
        sessionStorage.getItem(
            "yuellaActivePage"
        );


    const targetPage =
        savedPage ||
        "homePage";


    const page =
        document.getElementById(
            targetPage
        );


    if(page){

        page.classList.add(
            "active"
        );

    }


    /* ======================================================
       RESTORE ACTIVE NAVIGATION
    ====================================================== */

    document
        .querySelectorAll(
            ".nav-item"
        )
        .forEach(
            item => {

                item.classList.remove(
                    "active"
                );


                if(
                    item.dataset.page ===
                    targetPage
                ){

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

}


/* ==========================================================
   SHOW LOGGED-OUT STATE
========================================================== */

function showLoggedOutState(){

    const authContainer =
        document.getElementById(
            "authContainer"
        );

    const app =
        document.getElementById(
            "app"
        );


    if(app){

        app.style.display =
            "none";

    }


    if(authContainer){

        authContainer.style.display =
            "block";

    }


    document
        .querySelectorAll(
            ".app-page"
        )
        .forEach(
            page => {

                page.classList.remove(
                    "active"
                );

            }
        );


    document
        .querySelectorAll(
            ".auth-page"
        )
        .forEach(
            page => {

                page.classList.remove(
                    "active"
                );

            }
        );


    const loginPage =
        document.getElementById(
            "loginPage"
        );


    if(loginPage){

        loginPage.classList.add(
            "active"
        );

    }

}

/* ==========================================================
   YUELLA BILL TRACKER
   LOGOUT
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeLogout();

    }
);


/* ==========================================================
   INITIALIZE LOGOUT
========================================================== */

function initializeLogout(){

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if(!logoutButton){

        return;

    }


    logoutButton.addEventListener(
        "click",
        handleLogout
    );

}


/* ==========================================================
   HANDLE LOGOUT
========================================================== */

async function handleLogout(){

    try{

        /*
         * CLEAR LAST ACTIVE PAGE
         *
         * This makes the next login
         * start at Dashboard.
         */

        sessionStorage.removeItem(
            "yuellaActivePage"
        );


        /*
         * SIGN OUT FROM SUPABASE
         */

        const {
            error
        } =
            await supabaseClient.auth.signOut();


        if(error){

            console.error(
                "Logout error:",
                error
            );

            return;

        }


        /*
         * SHOW LOGIN PAGE
         */

        showLoggedOutState();


        /*
         * CLEAR LOGIN FORM
         */

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if(loginForm){

            loginForm.reset();

        }


        console.log(
            "Yuella logout successful."
        );

    }

    catch(error){

        console.error(
            "Unexpected logout error:",
            error
        );

    }

}

/* ==========================================================
   YUELLA BILL TRACKER
   CHANGE PASSWORD NAVIGATION
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeChangePasswordNavigation();

    }
);


/* ==========================================================
   INITIALIZE CHANGE PASSWORD NAVIGATION
========================================================== */

function initializeChangePasswordNavigation(){

    const changePasswordButton =
        document.getElementById(
            "changePasswordButton"
        );

    const cancelChangePasswordButton =
        document.getElementById(
            "cancelChangePasswordButton"
        );

    const changePasswordPage =
        document.getElementById(
            "changePasswordPage"
        );

    const settingsPage =
        document.getElementById(
            "settingsPage"
        );

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    /* ======================================================
       OPEN CHANGE PASSWORD
    ====================================================== */

    if(changePasswordButton){

        changePasswordButton.addEventListener(
            "click",
            () => {

                document
    .querySelectorAll(
        ".app-page, .settings-subpage"
    )
    .forEach(
        page => {

            page.classList.remove(
                "active"
            );

        }
    );


                if(changePasswordPage){

                    changePasswordPage.classList.add(
                        "active"
                    );

                }


                navItems.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                sessionStorage.setItem(
                    "yuellaActivePage",
                    "changePasswordPage"
                );


                window.scrollTo(
                    {
                        top:0,
                        behavior:"instant"
                    }
                );

            }
        );

    }


    /* ======================================================
       CANCEL CHANGE PASSWORD
    ====================================================== */

    if(cancelChangePasswordButton){

        cancelChangePasswordButton.addEventListener(
            "click",
            () => {

                if(changePasswordPage){

                    changePasswordPage.classList.remove(
                        "active"
                    );

                }


                if(settingsPage){

                    settingsPage.classList.add(
                        "active"
                    );

                }


                navItems.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );


                        if(
                            item.dataset.page ===
                            "settingsPage"
                        ){

                            item.classList.add(
                                "active"
                            );

                        }

                    }
                );


                sessionStorage.setItem(
                    "yuellaActivePage",
                    "settingsPage"
                );


                window.scrollTo(
                    {
                        top:0,
                        behavior:"instant"
                    }
                );

            }
        );

    }

}

/* ==========================================================
   YUELLA BILL TRACKER
   UPDATE PASSWORD
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeChangePassword();

    }
);


/* ==========================================================
   INITIALIZE CHANGE PASSWORD
========================================================== */

function initializeChangePassword(){

    const changePasswordForm =
        document.getElementById(
            "changePasswordForm"
        );


    if(!changePasswordForm){

        return;

    }


    changePasswordForm.addEventListener(
        "submit",
        handleChangePassword
    );

}


/* ==========================================================
   HANDLE CHANGE PASSWORD
========================================================== */

async function handleChangePassword(event){

    event.preventDefault();


    const newPasswordInput =
        document.getElementById(
            "newPassword"
        );

    const confirmNewPasswordInput =
        document.getElementById(
            "confirmNewPassword"
        );

    const updatePasswordButton =
        document.getElementById(
            "updatePasswordButton"
        );

    const message =
        document.getElementById(
            "changePasswordMessage"
        );


    if(
        !newPasswordInput ||
        !confirmNewPasswordInput
    ){

        return;

    }


    const newPassword =
        newPasswordInput.value;

    const confirmNewPassword =
        confirmNewPasswordInput.value;


    if(message){

        message.textContent = "";

    }


    /* ======================================================
       VALIDATE PASSWORD
    ====================================================== */

    if(newPassword.length < 6){

        showChangePasswordMessage(
            "Password must be at least 6 characters."
        );

        return;

    }


    /* ======================================================
       CONFIRM PASSWORD
    ====================================================== */

    if(
        newPassword !==
        confirmNewPassword
    ){

        showChangePasswordMessage(
            "Passwords do not match."
        );

        return;

    }


    if(
        typeof supabaseClient ===
        "undefined"
    ){

        showChangePasswordMessage(
            "Supabase connection is not available."
        );

        return;

    }


    try{

        if(updatePasswordButton){

            updatePasswordButton.disabled =
                true;

            updatePasswordButton.textContent =
                "Updating...";

        }


        /* ==================================================
           UPDATE SUPABASE PASSWORD
        ================================================== */

        const {
            error
        } =
            await supabaseClient.auth.updateUser({

                password:
                    newPassword

            });


        if(error){

            console.error(
                "Password update error:",
                error
            );

            showChangePasswordMessage(
                error.message
            );

            return;

        }


        /* ==================================================
           SUCCESS
        ================================================== */

        showChangePasswordMessage(
            "Password updated successfully."
        );


        newPasswordInput.value = "";

        confirmNewPasswordInput.value = "";


        /* ==================================================
           RETURN TO SETTINGS
        ================================================== */

        setTimeout(
            () => {

                const changePasswordPage =
                    document.getElementById(
                        "changePasswordPage"
                    );

                const settingsPage =
                    document.getElementById(
                        "settingsPage"
                    );


                if(changePasswordPage){

                    changePasswordPage.classList.remove(
                        "active"
                    );

                }


                if(settingsPage){

                    settingsPage.classList.add(
                        "active"
                    );

                }


                document
                    .querySelectorAll(
                        ".nav-item"
                    )
                    .forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );


                            if(
                                item.dataset.page ===
                                "settingsPage"
                            ){

                                item.classList.add(
                                    "active"
                                );

                            }

                        }
                    );


                sessionStorage.setItem(
                    "yuellaActivePage",
                    "settingsPage"
                );


                window.scrollTo(
                    {
                        top:0,
                        behavior:"instant"
                    }
                );

            },
            1000
        );

    }

    catch(error){

        console.error(
            "Unexpected password update error:",
            error
        );

        showChangePasswordMessage(
            "Something went wrong. Please try again."
        );

    }

    finally{

        if(updatePasswordButton){

            updatePasswordButton.disabled =
                false;

            updatePasswordButton.textContent =
                "Update Password";

        }

    }

}


/* ==========================================================
   CHANGE PASSWORD MESSAGE
========================================================== */

function showChangePasswordMessage(
    message
){

    const changePasswordMessage =
        document.getElementById(
            "changePasswordMessage"
        );


    if(changePasswordMessage){

        changePasswordMessage.textContent =
            message;

    }

}

/* ==========================================================
   WAIT FOR SUPABASE SESSION
========================================================== */

async function waitForSupabaseSession(){

    for(
        let attempt = 0;
        attempt < 20;
        attempt++
    ){

        const {
            data
        } =
            await supabaseClient.auth.getSession();


        if(
            data?.session?.user
        ){

            return data.session.user;

        }


        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    250
                )
        );

    }


    return null;

}

/* ==========================================================
   YUELLA BILL TRACKER
   DASHBOARD DATA
========================================================== */

async function loadDashboardData(){

    try{

/* ==================================================
   WAIT FOR CURRENT USER
================================================== */

const user =
    await waitForSupabaseSession();


if(!user){

    console.log(
        "No logged-in user for dashboard."
    );

    return;

}


        /* ==================================================
           GET USER EXPENSES
           RLS ALSO PROTECTS THIS DATA
        ================================================== */

        const {
            data: expenses,
            error: expenseError
        } =
            await supabaseClient
                .from("expenses")
                .select("*")
                .eq(
                    "user_id",
                    user.id
                );


        if(expenseError){

            console.error(
                "Dashboard expenses error:",
                expenseError
            );

            return;

        }


        const expenseList =
            Array.isArray(expenses)
                ? expenses
                : [];


        /* ==================================================
           CURRENT DATE
        ================================================== */

        const now =
            new Date();


        const currentYear =
            now.getFullYear();


        const currentMonth =
            now.getMonth();


        /* ==================================================
           HELPER - DATE ONLY
        ================================================== */

        function getDateOnly(
            value
        ){

            if(!value){

                return null;

            }


            const date =
                new Date(
                    value + "T00:00:00"
                );


            if(
                Number.isNaN(
                    date.getTime()
                )
            ){

                return null;

            }


            return new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            );

        }


        /* ==================================================
           MONTHLY EXPENSES
        ================================================== */

        const monthlyExpenses =
            expenseList.filter(
                expense => {

                    const date =
                        getDateOnly(
                            expense.expense_date
                        );


                    if(!date){

                        return false;

                    }


                    return (
                        date.getFullYear() ===
                            currentYear
                        &&
                        date.getMonth() ===
                            currentMonth
                    );

                }
            );


        /* ==================================================
           JPY TOTAL
        ================================================== */

        const jpyTotal =
            monthlyExpenses.reduce(
                (
                    total,
                    expense
                ) => {

                    if(
                        expense.currency !==
                        "JPY"
                    ){

                        return total;

                    }


                    return (
                        total +
                        Number(
                            expense.amount
                        || 0
                        )
                    );

                },
                0
            );


        /* ==================================================
           PHP TOTAL
        ================================================== */

        const phpTotal =
            monthlyExpenses.reduce(
                (
                    total,
                    expense
                ) => {

                    if(
                        expense.currency !==
                        "PHP"
                    ){

                        return total;

                    }


                    return (
                        total +
                        Number(
                            expense.amount
                        || 0
                        )
                    );

                },
                0
            );


        /* ==================================================
           PAYMENT STATUS
        ================================================== */

        let paidCount =
            0;

        let unpaidCount =
            0;


        expenseList.forEach(
            expense => {

                const status =
                    String(
                        expense.status
                    || ""
                    )
                    .trim()
                    .toLowerCase();


                /* ==========================================
                   PAID
                ========================================== */

                if(
                    status ===
                    "paid"
                ){

                    paidCount++;

                }


                /* ==========================================
                   UNPAID
                ========================================== */

                else if(
                    status ===
                    "unpaid"
                ){

                    unpaidCount++;

                }

            }
        );


        /* ==================================================
   UPDATE JPY
================================================== */

const jpyElement =
    document.getElementById(
        "dashboardJPYTotal"
    );


if(jpyElement){

    jpyElement.textContent =
        "¥" +
        jpyTotal.toLocaleString(
            "en-US",
            {
                maximumFractionDigits:0
            }
        );

}


/* ==================================================
   UPDATE PHP
================================================== */

const phpElement =
    document.getElementById(
        "dashboardPHPTotal"
    );


if(phpElement){

    phpElement.textContent =
        "₱" +
        phpTotal.toLocaleString(
            "en-US",
            {
                maximumFractionDigits:0
            }
        );

}

        /* ==================================================
           UPDATE PAID
        ================================================== */

        const paidElement =
            document.getElementById(
                "dashboardPaidCount"
            );


        if(paidElement){

            paidElement.textContent =
                paidCount;

        }


        /* ==================================================
           UPDATE UNPAID
        ================================================== */

        const unpaidElement =
            document.getElementById(
                "dashboardUnpaidCount"
            );


        if(unpaidElement){

            unpaidElement.textContent =
                unpaidCount;

        }


        /* ==================================================
           LOG DASHBOARD DATA
        ================================================== */

        console.log(
            "Yuella Dashboard loaded:",
            {
                userId:
                    user.id,

                expenses:
                    expenseList.length,

                jpyTotal,

                phpTotal,

                paidCount,

                unpaidCount

            }
        );

/* ==================================================
   REFRESH RECENT EXPENSES
================================================== */

if(
    typeof loadRecentExpenses ===
    "function"
){

    await loadRecentExpenses();

}

/* ==========================================================
   MONTHLY OVERVIEW
========================================================== */

const monthlyOverviewMonth =
    new Date().getMonth();

const monthlyOverviewYear =
    new Date().getFullYear();


/* ==========================================================
   MONTHLY EXPENSE TOTALS
========================================================== */

const monthlyJPYExpenses =
    expenseList.filter(
        expense => {

            if(
                expense.currency !==
                "JPY"
            ){

                return false;

            }


            if(
                !expense.expense_date
            ){

                return false;

            }


            const expenseDate =
                new Date(
                    expense.expense_date +
                    "T00:00:00"
                );


            return (
                expenseDate.getMonth() ===
                    monthlyOverviewMonth
                &&
                expenseDate.getFullYear() ===
                    monthlyOverviewYear
            );

        }
    );


const monthlyPHPExpenses =
    expenseList.filter(
        expense => {

            if(
                expense.currency !==
                "PHP"
            ){

                return false;

            }


            if(
                !expense.expense_date
            ){

                return false;

            }


            const expenseDate =
                new Date(
                    expense.expense_date +
                    "T00:00:00"
                );


            return (
                expenseDate.getMonth() ===
                    monthlyOverviewMonth
                &&
                expenseDate.getFullYear() ===
                    monthlyOverviewYear
            );

        }
    );


/* ==========================================================
   MONTHLY TOTALS
========================================================== */

const monthlyJPYTotal =
    monthlyJPYExpenses.reduce(
        (
            total,
            expense
        ) => {

            return (
                total +
                Number(
                    expense.amount || 0
                )
            );

        },
        0
    );


const monthlyPHPTotal =
    monthlyPHPExpenses.reduce(
        (
            total,
            expense
        ) => {

            return (
                total +
                Number(
                    expense.amount || 0
                )
            );

        },
        0
    );


/* ==========================================================
   UPDATE MONTHLY OVERVIEW
========================================================== */

if(
    typeof updateMonthlyOverviewData ===
    "function"
){

    updateMonthlyOverviewData(
        {
            JPY:
                monthlyJPYExpenses,

            PHP:
                monthlyPHPExpenses,

            JPYTotal:
                monthlyJPYTotal,

            PHPTotal:
                monthlyPHPTotal

        }
    );

}


    }
    catch(error){

        console.error(
            "Yuella Dashboard error:",
            error
        );

    }

}

/* ==========================================================
   LOAD DASHBOARD AFTER PAGE LOAD
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadDashboardData();

    }
);


/* ==========================================================
   RELOAD DASHBOARD WHEN AUTH CHANGES
========================================================== */

if(
    typeof supabaseClient !==
    "undefined"
){

    supabaseClient.auth.onAuthStateChange(
        (
            event,
            session
        ) => {

            if(session){

                setTimeout(
                    () => {

                        loadDashboardData();

                    },
                    0
                );

            }

        }
    );

}

/* ==========================================================
   LOAD RECENT EXPENSES
========================================================== */

async function loadRecentExpenses(){

    const container =
        document.getElementById(
            "recentExpensesList"
        );


    if(!container){

        return;

    }


    try{

        /* ==================================================
           GET CURRENT USER
        ================================================== */

        const {
            data: userData,
            error: userError
        } =
            await supabaseClient.auth.getUser();


        if(
            userError ||
            !userData?.user
        ){

            container.innerHTML = "";

            return;

        }


        const user =
            userData.user;


        /* ==================================================
           GET LATEST 5 EXPENSES
        ================================================== */

        const {
            data: expenses,
            error
        } =
            await supabaseClient
                .from("expenses")
                .select("*")
                .eq(
                    "user_id",
                    user.id
                )
                .order(
                    "created_at",
                    {
                        ascending:false
                    }
                )
                .limit(5);


        if(error){

            console.error(
                "Recent expenses error:",
                error
            );

            container.innerHTML = "";

            return;

        }


        const recentExpenses =
            Array.isArray(expenses)
                ? expenses.slice(0,5)
                : [];


        /* ==================================================
           EMPTY STATE
        ================================================== */

        if(!recentExpenses.length){

            container.innerHTML = `

                <div class="empty-dashboard-card">

                    <div class="empty-icon">
                        ₱
                    </div>

                    <strong>
                        No expenses yet
                    </strong>

                    <span>
                        Add your first expense.
                    </span>

                </div>

            `;

            return;

        }


        /* ==================================================
           DISPLAY RECENT EXPENSES
        ================================================== */

        container.innerHTML =
            recentExpenses
                .map(
                    expense => {

                        const amount =
                            Number(
                                expense.amount ||
                                0
                            );


                        const symbol =
                            expense.currency ===
                            "JPY"
                                ? "¥"
                                : "₱";


                        /* ==================================
                           DATE
                        ================================== */

                        let dateText =
                            "";


                        if(
                            expense.expense_date
                        ){

                            const date =
                                new Date(
                                    expense.expense_date +
                                    "T00:00:00"
                                );


                            if(
                                !Number.isNaN(
                                    date.getTime()
                                )
                            ){

                                dateText =
                                    date.toLocaleDateString(
                                        "en-US",
                                        {
                                            month:
                                                "short",

                                            day:
                                                "numeric",

                                            year:
                                                "numeric"
                                        }
                                    );

                            }

                        }


                        /* ==================================
                           STATUS
                        ================================== */

                        const status =
                            String(
                                expense.status ||
                                ""
                            )
                            .trim()
                            .toLowerCase();


                        /* ==================================
                           EXPENSE NAME
                        ================================== */

                        const expenseName =
                            expense.expense_name ||
                            expense.other_input ||
                            expense.category ||
                            "Expense";


                        /* ==================================
                           RETURN CARD
                        ================================== */

                        return `

                            <div
                                class="dashboard-expense-item"
                            >

                                <div
                                    class="dashboard-expense-info"
                                >

                                    <strong>
                                        ${escapeDashboardText(
                                            expenseName
                                        )}
                                    </strong>


                                    <small>
                                        ${dateText}
                                    </small>

                                </div>


                                <div
                                    class="dashboard-expense-right"
                                >

                                    <strong
    class="dashboard-expense-amount"
>
    ${symbol}${amount.toLocaleString(
        "en-US",
        {
            maximumFractionDigits:0
        }
    )}
</strong>


                                    <small>
                                        ${escapeDashboardText(
                                            status
                                        )}
                                    </small>

                                </div>

                            </div>

                        `;

                    }
                )
                .join("");

    }
    catch(error){

        console.error(
            "Recent expenses unexpected error:",
            error
        );

    }

}

/* ==========================================================
   DASHBOARD TEXT SAFETY
========================================================== */

function escapeDashboardText(
    value
){

    return String(
        value ?? ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}


/* ==========================================================
   LOAD DASHBOARD LISTS
========================================================== */

async function loadDashboardLists(){

    await loadRecentExpenses();

}


/* ==========================================================
   UPDATE DASHBOARD LOADER
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadDashboardLists();

    }
);


/* ==========================================================
   REFRESH LISTS AFTER AUTHENTICATION
========================================================== */

if(
    typeof supabaseClient !==
    "undefined"
){

    supabaseClient.auth.onAuthStateChange(
        (
            event,
            session
        ) => {

            if(session){

                setTimeout(
                    () => {

                        loadDashboardLists();

                    },
                    0
                );

            }

        }
    );

}

/* ==========================================================
   MONTHLY OVERVIEW CURRENCY SWITCHER
========================================================== */

let monthlyOverviewCurrency = "JPY";


/* ==========================================================
   MONTHLY OVERVIEW ELEMENTS
========================================================== */

const monthlyCurrencyButtons =
    document.querySelectorAll(
        "#homePage .monthly-currency-button"
    );


const monthlyOverviewTotal =
    document.getElementById(
        "monthlyOverviewTotal"
    );


const monthlyChartYAxis =
    document.getElementById(
        "monthlyChartYAxis"
    );


/* ==========================================================
   UPDATE MONTHLY OVERVIEW CURRENCY
========================================================== */

function updateMonthlyOverviewCurrency(
    currency
){

    monthlyOverviewCurrency =
        currency === "PHP"
            ? "PHP"
            : "JPY";


    /* ======================================================
       ACTIVE BUTTON
    ====================================================== */

    monthlyCurrencyButtons.forEach(
        button => {

            const buttonCurrency =
                button.dataset.currency;


            button.classList.toggle(
                "active",
                buttonCurrency ===
                    monthlyOverviewCurrency
            );

        }
    );


    /* ======================================================
       GET MONTHLY DATA
    ====================================================== */

    const data =
        window.monthlyOverviewData || {};


    const total =
        monthlyOverviewCurrency === "JPY"
            ? Number(
                data.JPYTotal || 0
            )
            : Number(
                data.PHPTotal || 0
            );


    const symbol =
        monthlyOverviewCurrency === "JPY"
            ? "¥"
            : "₱";


    /* ======================================================
   UPDATE TOTAL
====================================================== */

if(monthlyOverviewTotal){

    monthlyOverviewTotal.textContent =
        symbol +
        total.toLocaleString(
            "en-US",
            {
                maximumFractionDigits:0
            }
        );

}

    /* ======================================================
       REDRAW GRAPH
    ====================================================== */

    drawMonthlyOverviewGraph();

}

 /* ==========================================================
    STORE + DRAW MONTHLY OVERVIEW GRAPH
 ========================================================== */

 function updateMonthlyOverviewData(
     data
 ){

     window.monthlyOverviewData =
         data || {};


     updateMonthlyOverviewCurrency(
         monthlyOverviewCurrency
     );


     /* ======================================================
        DRAW GRAPH AFTER DATA IS STORED
     ====================================================== */

     if(
         typeof drawMonthlyOverviewGraph ===
         "function"
     ){

         drawMonthlyOverviewGraph();

     }

 }

/* ==========================================================
   DRAW MONTHLY OVERVIEW GRAPH
========================================================== */

function drawMonthlyOverviewGraph(){

    const data =
        window.monthlyOverviewData || {};


    const currency =
        monthlyOverviewCurrency === "PHP"
            ? "PHP"
            : "JPY";


    const expenses =
        Array.isArray(
            data[currency]
        )
            ? data[currency]
            : [];


    const total =
        currency === "JPY"
            ? Number(
                data.JPYTotal || 0
            )
            : Number(
                data.PHPTotal || 0
            );


    const symbol =
        currency === "JPY"
            ? "¥"
            : "₱";


   /* ======================================================
   UPDATE TOTAL
====================================================== */

if(monthlyOverviewTotal){

    monthlyOverviewTotal.textContent =
        symbol +
        total.toLocaleString(
            "en-US",
            {
                maximumFractionDigits:0
            }
        );

}


    /* ======================================================
       FIND SVG
    ====================================================== */

    const chart =
        document.querySelector(
            "#homePage .monthly-line-chart"
        );


    if(!chart){

        return;

    }


    /* ======================================================
       REMOVE OLD GRAPH
    ====================================================== */

    chart
        .querySelectorAll(
            ".monthly-chart-fill, .monthly-chart-line, .monthly-chart-point"
        )
        .forEach(
            element => {

                element.remove();

            }
        );


    /* ======================================================
   GET CURRENT DATE
====================================================== */

const currentDate =
    new Date();


const currentYear =
    currentDate.getFullYear();


    /* ======================================================
       MONTHLY TOTALS
    ====================================================== */

    const monthlyTotals =
        Array.from(
            {
                length:12
            },
            () => 0
        );


    expenses.forEach(
        expense => {

            if(
                !expense ||
                !expense.expense_date
            ){

                return;

            }


            const date =
                new Date(
                    expense.expense_date +
                    "T00:00:00"
                );

            const month =
    date.getMonth();


const year =
    date.getFullYear();


if(
    year === currentYear
){

    monthlyTotals[month] +=
        Number(
            expense.amount || 0
        );

}

        }
    );


/* ======================================================
   LAST 6 MONTHS
====================================================== */

const currentMonth =
    currentDate.getMonth();


const currentYearForGraph =
    currentDate.getFullYear();


const months = [];


for(
    let i = 5;
    i >= 0;
    i--
){

    const date =
        new Date(
            currentYearForGraph,
            currentMonth - i,
            1
        );


    months.push(
        {
            month:
                date.getMonth(),

            year:
                date.getFullYear()
        }
    );

}

    /* ======================================================
       GRAPH DIMENSIONS
    ====================================================== */

    const width =
        320;

    const height =
        180;


    const left =
        15;

    const right =
        305;

    const top =
        20;

    const bottom =
        160;


    const graphWidth =
        right - left;

    const graphHeight =
        bottom - top;


  /* ======================================================
   MAX VALUE
====================================================== */

const values =
    months.map(
        item => {

            const expenseTotal =
                expenses.reduce(
                    (
                        total,
                        expense
                    ) => {

                        if(
                            !expense ||
                            !expense.expense_date
                        ){

                            return total;

                        }


                        const date =
                            new Date(
                                expense.expense_date +
                                "T00:00:00"
                            );


                        if(
                            date.getMonth() !==
                                item.month
                            ||
                            date.getFullYear() !==
                                item.year
                        ){

                            return total;

                        }


                        return (
                            total +
                            Number(
                                expense.amount || 0
                            )
                        );

                    },
                    0
                );


            return expenseTotal;

        }
    );


const actualMaxValue =
    Math.max(
        ...values,
        0
    );


const maxValue =
    actualMaxValue > 0
        ? actualMaxValue
        : 0;


    /* ======================================================
   CREATE POINTS
====================================================== */

const points =
    values.map(
        (
            value,
            index
        ) => {

            const x =
                values.length === 1
                    ? left
                    : left +
                        (
                            graphWidth /
                            (values.length - 1)
                        ) *
                        index;


            const y =
    maxValue === 0
        ? bottom
        : value <= 0
            ? bottom
            : bottom -
                (
                    value /
                    maxValue
                ) *
                graphHeight;


            return {
                x,
                y,
                value
            };

        }
    );

    /* ======================================================
       CREATE LINE PATH
    ====================================================== */

    const linePath =
        points
            .map(
                (
                    point,
                    index
                ) => {

                    return (
                        index === 0
                            ? `M ${point.x} ${point.y}`
                            : `L ${point.x} ${point.y}`
                    );

                }
            )
            .join(" ");


    /* ======================================================
   CREATE FILL PATH
====================================================== */

const firstPoint =
    points[0];

const lastPoint =
    points[
        points.length - 1
    ];


const fillPath =
    `
        M ${firstPoint.x} ${bottom}
        L ${firstPoint.x} ${firstPoint.y}
        ${points
            .slice(1)
            .map(
                point =>
                    `L ${point.x} ${point.y}`
            )
            .join(" ")
        }
        L ${lastPoint.x} ${bottom}
        Z
    `;

    /* ======================================================
       CREATE FILL
    ====================================================== */

    const fill =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );


    fill.setAttribute(
        "class",
        "monthly-chart-fill"
    );


    fill.setAttribute(
        "d",
        fillPath
    );


    chart.appendChild(
        fill
    );


    /* ======================================================
       CREATE LINE
    ====================================================== */

    const line =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );


    line.setAttribute(
        "class",
        "monthly-chart-line"
    );


    line.setAttribute(
        "d",
        linePath
    );


    chart.appendChild(
        line
    );

/* ======================================================
   CREATE GRAPH POINTS
====================================================== */

points.forEach(
    point => {

        /* ==============================================
           DO NOT SHOW DOT WHEN THERE IS NO SPENDING
        ============================================== */

        if(
            point.value <= 0
        ){

            return;

        }


        const circle =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );


        circle.setAttribute(
            "class",
            "monthly-chart-point"
        );


        circle.setAttribute(
            "cx",
            point.x
        );


        circle.setAttribute(
            "cy",
            point.y
        );


        circle.setAttribute(
            "r",
            4
        );


        chart.appendChild(
            circle
        );

    }
);

    /* ======================================================
       UPDATE MONTH LABELS
    ====================================================== */

    const monthContainer =
        document.querySelector(
            "#homePage .chart-months"
        );


    if(monthContainer){

        monthContainer.innerHTML =
            months
                .map(
                    item => {

                        const date =
                            new Date(
                                item.year,
                                item.month,
                                1
                            );


                        return `
                            <span>
                                ${date.toLocaleDateString(
                                    "en-US",
                                    {
                                        month:"short"
                                    }
                                )}
                            </span>
                        `;

                    }
                )
                .join("");

    }


    /* ======================================================
   UPDATE Y AXIS
====================================================== */

if(monthlyChartYAxis){

    const step =
        maxValue / 4;


    const axisValues =
        [
            maxValue,
            step * 3,
            step * 2,
            step,
            0
        ];


    monthlyChartYAxis.innerHTML =
        axisValues
            .map(
                value => {

                    let display;


                    if(
                        value >= 1000000
                    ){

                        display =
                            (
                                value /
                                1000000
                            ).toFixed(1) +
                            "m";

                    }
                    else if(
                        value >= 1000
                    ){

                        display =
                            Math.round(
                                value / 1000
                            ) +
                            "k";

                    }
                    else{

                        display =
                            Math.round(
                                value
                            );

                    }


                    return `
                        <span>
                            ${symbol}${display}
                        </span>
                    `;

                }
            )
            .join("");

    }

}

/* ==========================================================
   MONTHLY CURRENCY BUTTON EVENTS
========================================================== */

monthlyCurrencyButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                updateMonthlyOverviewCurrency(
                    button.dataset.currency
                );

                drawMonthlyOverviewGraph();

            }
        );

    }
);

/* ==========================================================
   INITIALIZE MONTHLY OVERVIEW
========================================================== */

function initializeMonthlyOverviewCurrency(){

    window.monthlyOverviewData =
        window.monthlyOverviewData || {

            JPY:[],
            PHP:[],
            JPYTotal:0,
            PHPTotal:0

        };


    updateMonthlyOverviewCurrency(
        "JPY"
    );

}


if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        initializeMonthlyOverviewCurrency
    );

}
else{

    initializeMonthlyOverviewCurrency();

}

/* ==========================================================
   YUELLA EXPENSES PAGE
   LOAD + FILTER EXPENSES
========================================================== */

let yuellaExpenses = [];

let currentExpenseFilter = "all";

/* ==========================================================
   LOAD EXPENSES PAGE
   GET ALL USER EXPENSES FROM SUPABASE
========================================================== */

async function loadExpensesPage(){

    try{

        console.log(
    "LOAD EXPENSES PAGE CALLED"
);

        /* ==================================================
           CHECK SUPABASE
        ================================================== */

        if(
            typeof supabaseClient ===
            "undefined"
        ){

            console.error(
                "Supabase connection is not available."
            );

            return;

        }


        /* ==================================================
           GET CURRENT USER
        ================================================== */

        const {
            data: userData,
            error: userError
        } =
            await supabaseClient.auth.getUser();


        if(userError){

            console.error(
                "Expenses user error:",
                userError
            );

            return;

        }


        const user =
            userData?.user;


        if(!user){

            console.log(
                "No logged-in user for Expenses page."
            );

            return;

        }


        /* ==================================================
           GET ALL USER EXPENSES
        ================================================== */

        const {
            data: expenses,
            error: expenseError
        } =
            await supabaseClient
                .from("expenses")
                .select("*")
                .eq(
                    "user_id",
                    user.id
                )
                .order(
                    "expense_date",
                    {
                        ascending:false
                    }
                );


        if(expenseError){

            console.error(
                "Expenses page error:",
                expenseError
            );

            return;

        }


        /* ==================================================
           STORE EXPENSES
        ================================================== */

        yuellaExpenses =
            Array.isArray(expenses)
                ? expenses
                : [];


        /* ==================================================
           RENDER EXPENSES
        ================================================== */

        renderExpenses();


    }
    catch(error){

        console.error(
            "Unexpected Expenses page error:",
            error
        );

    }

}

/* ==========================================================
   EXPENSES PAGE NAVIGATION
========================================================== */

document.addEventListener(
    "click",
    event => {

        const navItem =
            event.target.closest(
                '.nav-item[data-page="expensesPage"]'
            );


        if(!navItem){

            return;

        }


        setTimeout(
            () => {

                loadExpensesPage();

            },
            0
        );

    }
);

/* ==========================================================
   RENDER EXPENSES
   SHOW 10 BY DEFAULT
   SEARCH ALL EXPENSES
   FILTER + SEARCH
========================================================== */

function renderExpenses(){

    const expensesList =
        document.getElementById(
            "expensesList"
        );


    if(!expensesList){

        return;

    }


    /* ======================================================
       GET SEARCH VALUE
    ====================================================== */

    const searchInput =
        document.getElementById(
            "expenseSearch"
        );


    const searchValue =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    /* ======================================================
       START WITH ALL EXPENSES
    ====================================================== */

    let filteredExpenses =
        [...yuellaExpenses];


    /* ======================================================
       APPLY CURRENCY / STATUS FILTER
    ====================================================== */

    if(
        currentExpenseFilter ===
        "JPY"
    ){

        filteredExpenses =
            filteredExpenses.filter(
                expense =>
                    expense.currency ===
                    "JPY"
            );

    }


    else if(
        currentExpenseFilter ===
        "PHP"
    ){

        filteredExpenses =
            filteredExpenses.filter(
                expense =>
                    expense.currency ===
                    "PHP"
            );

    }


    else if(
        currentExpenseFilter ===
        "unpaid"
    ){

        filteredExpenses =
            filteredExpenses.filter(
                expense => {

                    const status =
                        String(
                            expense.status ||
                            ""
                        )
                        .trim()
                        .toLowerCase();


                    return (
                        status ===
                        "unpaid"
                    );

                }
            );

    }


    /* ======================================================
       APPLY SEARCH
       SEARCHES ALL LOADED EXPENSES
    ====================================================== */

    if(searchValue){

        filteredExpenses =
            filteredExpenses.filter(
                expense => {

                    const name =
                        String(
                            expense.expense_name ||
                            ""
                        )
                        .toLowerCase();


                    const category =
                        String(
                            expense.category ||
                            ""
                        )
                        .toLowerCase();


                    const country =
                        String(
                            expense.country ||
                            ""
                        )
                        .toLowerCase();


                    const currency =
                        String(
                            expense.currency ||
                            ""
                        )
                        .toLowerCase();


                    const amount =
                        String(
                            expense.amount ||
                            ""
                        )
                        .toLowerCase();


                    const status =
                        String(
                            expense.status ||
                            ""
                        )
                        .toLowerCase();


                    const date =
                        String(
                            expense.expense_date ||
                            ""
                        )
                        .toLowerCase();


                    return (
                        name.includes(
                            searchValue
                        )
                        ||
                        category.includes(
                            searchValue
                        )
                        ||
                        country.includes(
                            searchValue
                        )
                        ||
                        currency.includes(
                            searchValue
                        )
                        ||
                        amount.includes(
                            searchValue
                        )
                        ||
                        status.includes(
                            searchValue
                        )
                        ||
                        date.includes(
                            searchValue
                        )
                    );

                }
            );

    }


    /* ======================================================
       SHOW ONLY 10 WHEN NOT SEARCHING
    ====================================================== */

    if(!searchValue){

        filteredExpenses =
            filteredExpenses.slice(
                0,
                10
            );

    }


    /* ======================================================
       NO RESULTS
    ====================================================== */

    if(
        filteredExpenses.length ===
        0
    ){

        expensesList.innerHTML = `

            <div class="empty-page-state">

                <div class="empty-page-icon">
                    🔍
                </div>

                <h2>
                    No expenses found
                </h2>

                <p>
                    Try another search or filter.
                </p>

            </div>

        `;

        return;

    }


    /* ======================================================
       RENDER EXPENSE CARDS
    ====================================================== */

    expensesList.innerHTML =
        filteredExpenses
            .map(
                expense => {

                    const amount =
                        Number(
                            expense.amount ||
                            0
                        );


                    const currency =
                        expense.currency ||
                        "";


                    const name =
                        expense.expense_name ||
                        expense.category ||
                        "Expense";


                    const category =
                        expense.category ||
                        "";


                    const country =
                        expense.country ||
                        "";


                    const date =
                        expense.expense_date ||
                        "";


                    const status =
                        String(
                            expense.status ||
                            ""
                        )
                        .trim()
                        .toLowerCase();


                    const statusLabel =
                        status === "paid"
                            ? "Paid"
                            : "Unpaid";


                    return `

    <div
        class="expense-item"
        data-expense-id="${expense.id || ""}"
    >

        <div
            class="expense-item-main"
        >

            <div
                class="expense-item-left"
            >

                <h3>
                    ${escapeExpenseHTML(
                        name
                    )}
                </h3>


                <p>

                    ${escapeExpenseHTML(
                        category
                    )}

                    ${
                        country
                            ? " • " +
                              escapeExpenseHTML(
                                  country
                              )
                            : ""
                    }

                </p>


                <small
                    class="expense-date-status"
                >

                    ${escapeExpenseHTML(
                        date
                    )}

                    <span>
                        •
                    </span>

                    ${statusLabel}

                </small>

            </div>


            <div
                class="expense-item-right"
            >

                <strong>

                    ${currency}

                    ${amount.toLocaleString(
                        "en-US",
                        {
                            maximumFractionDigits:0
                        }
                    )}

                </strong>


                <div
                    class="expense-actions"
                >

                    <button
                        type="button"
                        class="expense-edit-button"
                        data-id="${expense.id || ""}"
                    >
                        Edit
                    </button>


                    <button
                        type="button"
                        class="expense-delete-button"
                        data-id="${expense.id || ""}"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>


        <!-- ==========================================
             NOTES
        =========================================== -->

        <div
            class="expense-item-notes"
            style="display:none;"
        >

            <span>
                Notes
            </span>

            <p>
                ${escapeExpenseHTML(
                    expense.notes ||
                    "No notes."
                )}
            </p>

        </div>

    </div>

`;

                }
            )
            .join("");

}

/* ==========================================================
   EXPENSE CARD NOTES TOGGLE
========================================================== */

document.addEventListener(
    "click",
    event => {

        const card =
            event.target.closest(
                ".expense-item"
            );


        /* ==============================================
           CLICK OUTSIDE
        ============================================== */

        if(!card){

            document
                .querySelectorAll(
                    ".expense-item-notes"
                )
                .forEach(
                    notes => {

                        notes.style.display =
                            "none";

                    }
                );

            return;

        }


        /* ==============================================
           DO NOT TRIGGER CARD WHEN EDIT/DELETE
        ============================================== */

        if(
            event.target.closest(
                ".expense-edit-button"
            )
            ||
            event.target.closest(
                ".expense-delete-button"
            )
        ){

            return;

        }


        /* ==============================================
           GET NOTES
        ============================================== */

        const notes =
            card.querySelector(
                ".expense-item-notes"
            );


        if(!notes){

            return;

        }


        /* ==============================================
           CLOSE OTHER CARDS
        ============================================== */

        document
            .querySelectorAll(
                ".expense-item-notes"
            )
            .forEach(
                otherNotes => {

                    if(
                        otherNotes !==
                        notes
                    ){

                        otherNotes.style.display =
                            "none";

                    }

                }
            );


        /* ==============================================
           TOGGLE NOTES
        ============================================== */

        if(
            notes.style.display ===
            "none"
        ){

            notes.style.display =
                "block";

        }
        else{

            notes.style.display =
                "none";

        }

    }
);

/* ==========================================================
   EXPENSE SEARCH
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const searchInput =
            document.getElementById(
                "expenseSearch"
            );


        if(!searchInput){

            return;

        }


        searchInput.addEventListener(
            "input",
            () => {

                renderExpenses();

            }
        );

    }
);

/* ==========================================================
   EXPENSE FILTER BUTTONS
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const filterButtons =
            document.querySelectorAll(
                "#expensesPage .filter-button"
            );


        if(
            !filterButtons ||
            filterButtons.length === 0
        ){

            return;

        }


        filterButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        /* ==================================
                           REMOVE ACTIVE FROM ALL
                        ================================== */

                        filterButtons.forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        /* ==================================
                           ACTIVE BUTTON
                        ================================== */

                        button.classList.add(
                            "active"
                        );


                        /* ==================================
                           SAVE FILTER
                        ================================== */

                        currentExpenseFilter =
                            button.dataset.filter ||
                            "all";


                        /* ==================================
                           RENDER
                        ================================== */

                        renderExpenses();

                    }
                );

            }
        );

    }
);

/* ==========================================================
   DASHBOARD MONTH SELECTOR
========================================================== */

let dashboardSelectedYear = 2026;

let dashboardSelectedMonth = 7;

/* ==========================================================
   UPDATE MONTH LABEL
========================================================== */

function updateDashboardMonthLabel(){

    const monthLabel =
        document.getElementById(
            "dashboardSelectedMonth"
        );


    if(!monthLabel){

        return;

    }


    const date =
        new Date(
            dashboardSelectedYear,
            dashboardSelectedMonth,
            1
        );


    monthLabel.textContent =
        date.toLocaleDateString(
            "en-US",
            {
                month:"long",
                year:"numeric"
            }
        );

}

/* ==========================================================
   LOAD SELECTED MONTH TOTALS
========================================================== */

async function loadDashboardSelectedMonth(){

    try{

        const {
            data: userData,
            error: userError
        } =
            await supabaseClient.auth.getUser();

        if(
            userError ||
            !userData?.user
        ){

            return;

        }

        const user =
            userData.user;

        const startDate =
            new Date(
                dashboardSelectedYear,
                dashboardSelectedMonth,
                1
            );

        const endDate =
            new Date(
                dashboardSelectedYear,
                dashboardSelectedMonth + 1,
                1
            );

        const formatDate =
            date => {

                const year =
                    date.getFullYear();

                const month =
                    String(
                        date.getMonth() + 1
                    ).padStart(
                        2,
                        "0"
                    );

                const day =
                    String(
                        date.getDate()
                    ).padStart(
                        2,
                        "0"
                    );

                return (
                    year +
                    "-" +
                    month +
                    "-" +
                    day
                );

            };

        const start =
            formatDate(
                startDate
            );

        const end =
            formatDate(
                endDate
            );

        const {
            data: expenses,
            error
        } =
            await supabaseClient
                .from("expenses")
                .select(
                    "amount,currency,expense_date"
                )
                .eq(
                    "user_id",
                    user.id
                )
                .gte(
                    "expense_date",
                    start
                )
                .lt(
                    "expense_date",
                    end
                );

        if(error){

            console.error(
                "Dashboard month error:",
                error
            );

            return;

        }

        let jpyTotal = 0;

        let phpTotal = 0;

        (expenses || []).forEach(
            expense => {

                const amount =
                    Number(
                        expense.amount || 0
                    );

                if(
                    expense.currency ===
                    "JPY"
                ){

                    jpyTotal += amount;

                }

                if(
                    expense.currency ===
                    "PHP"
                ){

                    phpTotal += amount;

                }

            }
        );

        const jpyElement =
            document.getElementById(
                "dashboardJPYTotal"
            );

        const phpElement =
            document.getElementById(
                "dashboardPHPTotal"
            );

        if(jpyElement){

            jpyElement.textContent =
                "¥" +
                jpyTotal.toLocaleString(
                    "en-US"
                );

        }

        if(phpElement){

            phpElement.textContent =
                "₱" +
                phpTotal.toLocaleString(
                    "en-US"
                );

        }

        updateDashboardMonthLabel();

    }
    catch(error){

        console.error(
            "Dashboard selected month error:",
            error
        );

    }

}

/* ==========================================================
   MONTH ARROWS
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const previousButton =
            document.getElementById(
                "previousMonthButton"
            );

        const nextButton =
            document.getElementById(
                "nextMonthButton"
            );

        if(previousButton){

            previousButton.addEventListener(
                "click",
                async () => {

                    dashboardSelectedMonth--;

                    if(
                        dashboardSelectedMonth <
                        0
                    ){

                        dashboardSelectedMonth =
                            11;

                        dashboardSelectedYear--;

                    }

                    await loadDashboardSelectedMonth();

                }
            );

        }

        if(nextButton){

            nextButton.addEventListener(
                "click",
                async () => {

                    dashboardSelectedMonth++;

                    if(
                        dashboardSelectedMonth >
                        11
                    ){

                        dashboardSelectedMonth =
                            0;

                        dashboardSelectedYear++;

                    }

                    await loadDashboardSelectedMonth();

                }
            );

        }

        updateDashboardMonthLabel();

    }
);

/* ==========================================================
   ESCAPE HTML
========================================================== */

function escapeExpenseHTML(
    value
){

    return String(
        value ??
        ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}

/* ==========================================================
   DELETE EXPENSE
========================================================== */

document.addEventListener(
    "click",
    async event => {

        const deleteButton =
            event.target.closest(
                ".expense-delete-button"
            );


        if(!deleteButton){

            return;

        }


        const expenseId =
            deleteButton.dataset.id;


        if(!expenseId){

            return;

        }


        const confirmed =
            confirm(
                "Are you sure you want to delete this expense?"
            );


        if(!confirmed){

            return;

        }


        /* ==================================================
           CHECK SUPABASE
        ================================================== */

        if(
            typeof supabaseClient ===
            "undefined"
        ){

            alert(
                "Supabase connection is not available."
            );

            return;

        }


        try{

            /* ==============================================
               DELETE FROM SUPABASE
            ============================================== */

            const {
                error
            } =
                await supabaseClient
                    .from("expenses")
                    .delete()
                    .eq(
                        "id",
                        expenseId
                    );


            if(error){

                console.error(
                    "Delete expense error:",
                    error
                );

                alert(
                    "Failed to delete expense.\n\n" +
                    error.message
                );

                return;

            }


            /* ==============================================
               REMOVE FROM LOCAL ARRAY
            ============================================== */

            yuellaExpenses =
                yuellaExpenses.filter(
                    expense =>
                        String(
                            expense.id
                        ) !==
                        String(
                            expenseId
                        )
                );


            /* ==============================================
               REFRESH EXPENSES PAGE
            ============================================== */

            renderExpenses();


            /* ==============================================
               REFRESH DASHBOARD
            ============================================== */

            if(
                typeof loadDashboardData ===
                "function"
            ){

                await loadDashboardData();

            }


        }catch(error){

            console.error(
                "Unexpected delete error:",
                error
            );

            alert(
                "Something went wrong while deleting the expense."
            );

        }

    }
);

/* ==========================================================
   EDIT EXPENSE
========================================================== */

document.addEventListener(
    "click",
    event => {

        const editButton =
            event.target.closest(
                ".expense-edit-button"
            );


        if(!editButton){

            return;

        }


        const expenseId =
            editButton.dataset.id;


        if(!expenseId){

            return;

        }


        const expense =
            yuellaExpenses.find(
                item =>
                    String(item.id) ===
                    String(expenseId)
            );


        if(!expense){

            console.error(
                "Expense not found:",
                expenseId
            );

            return;

        }


        /* ==================================================
           SAVE EDIT MODE
        ================================================== */

        window.editingExpenseId =
            expense.id;


        /* ==================================================
           GET PAGES
        ================================================== */

        const expensesPage =
            document.getElementById(
                "expensesPage"
            );


        const addExpensePage =
            document.getElementById(
                "addExpensePage"
            );


        /* ==================================================
           HIDE ALL PAGES
        ================================================== */

        document
            .querySelectorAll(
                ".app-page"
            )
            .forEach(
                page => {

                    page.classList.remove(
                        "active"
                    );

                }
            );


        /* ==================================================
           SHOW ADD EXPENSE PAGE
        ================================================== */

        if(addExpensePage){

            addExpensePage.classList.add(
                "active"
            );

        }


        /* ==================================================
           SAVE ACTIVE PAGE
        ================================================== */

        sessionStorage.setItem(
            "yuellaActivePage",
            "addExpensePage"
        );


        /* ==================================================
           FILL FORM
        ================================================== */

        const country =
            document.getElementById(
                "expenseCountry"
            );


        const category =
            document.getElementById(
                "expenseCategory"
            );


        const otherInput =
            document.getElementById(
                "expenseOther"
            );


        const amount =
            document.getElementById(
                "expenseAmount"
            );


        const currency =
            document.getElementById(
                "expenseCurrency"
            );


        const expenseDate =
            document.getElementById(
                "expenseDate"
            );


        const status =
            document.getElementById(
                "expenseStatus"
            );


        const notes =
            document.getElementById(
                "expenseNotes"
            );


        /* ==================================================
           COUNTRY
        ================================================== */

        if(country){

            country.value =
                expense.country ||
                "";

        }


        /* ==================================================
           CATEGORY
        ================================================== */

        if(category){

            category.value =
                expense.category ||
                "";

        }


        /* ==================================================
           OTHER INPUT
        ================================================== */

        if(otherInput){

            otherInput.value =
                expense.other_input ||
                "";

        }


        /* ==================================================
           AMOUNT
        ================================================== */

        if(amount){

            amount.value =
                expense.amount ??
                "";

        }


        /* ==================================================
           CURRENCY
        ================================================== */

        if(currency){

            currency.value =
                expense.currency ||
                "";

        }


        /* ==================================================
           EXPENSE DATE
        ================================================== */

        if(expenseDate){

            expenseDate.value =
                expense.expense_date ||
                "";

        }


        /* ==================================================
           STATUS
        ================================================== */

        if(status){

            status.value =
                expense.status ||
                "";

        }


        /* ==================================================
           NOTES
        ================================================== */

        if(notes){

            notes.value =
                expense.notes ||
                "";

        }


        /* ==================================================
           CHANGE BUTTON TEXT
        ================================================== */

        const saveButton =
            document.getElementById(
                "saveExpenseButton"
            );


        if(saveButton){

            saveButton.textContent =
                "Update Expense";

        }


        /* ==================================================
           CHANGE PAGE TITLE
        ================================================== */

        const addExpenseTitle =
            addExpensePage?.querySelector(
                ".page-header h1"
            );


        if(addExpenseTitle){

            addExpenseTitle.textContent =
                "Edit Expense";

        }

    }
);

/* ==========================================================
   YUELLA REPORTS
   MONTHLY REPORT DATA
========================================================== */


/* ==========================================================
   REPORT STATE
========================================================== */

let reportCurrentDate =
    new Date();


/* ==========================================================
   FORMAT REPORT CURRENCY
========================================================== */

function formatReportCurrency(
    currency,
    amount
){

    const value =
        Number(amount || 0);


    const symbol =
        currency === "JPY"
            ? "¥"
            : "₱";


    return (
    symbol +
    value.toLocaleString(
        "en-US",
        {
            maximumFractionDigits:0
        }
    )
);

}


/* ==========================================================
   GET REPORT MONTH RANGE
========================================================== */

function getReportMonthRange(){

    const year =
        reportCurrentDate.getFullYear();


    const month =
        reportCurrentDate.getMonth();


    const start =
        new Date(
            year,
            month,
            1
        );


    const end =
        new Date(
            year,
            month + 1,
            0
        );


    const formatDate =
        date => {

            const y =
                date.getFullYear();


            const m =
                String(
                    date.getMonth() + 1
                ).padStart(
                    2,
                    "0"
                );


            const d =
                String(
                    date.getDate()
                ).padStart(
                    2,
                    "0"
                );


            return `${y}-${m}-${d}`;

        };


    return {

        year,

        month,

        start:
            formatDate(start),

        end:
            formatDate(end)

    };

}


/* ==========================================================
   UPDATE REPORT MONTH LABEL
========================================================== */

function updateReportMonthLabel(){

    const label =
        document.getElementById(
            "reportMonthLabel"
        );


    if(!label){

        return;

    }


    label.textContent =
        reportCurrentDate.toLocaleDateString(
            "en-US",
            {
                month:"long",
                year:"numeric"
            }
        );

}


/* ==========================================================
   LOAD REPORTS
========================================================== */

async function loadReports(){

    try{

        if(
            typeof supabaseClient ===
            "undefined"
        ){

            console.error(
                "Supabase connection is not available."
            );

            return;

        }


/* ==================================================
   WAIT FOR CURRENT USER
================================================== */

const user =
    await waitForSupabaseSession();


if(!user){

    console.log(
        "No logged-in user for reports."
    );

    return;

}

        /* ==================================================
           GET MONTH RANGE
        ================================================== */

        const range =
            getReportMonthRange();


        /* ==================================================
           GET MONTH EXPENSES
        ================================================== */

        const {
            data:expenses,
            error
        } =
            await supabaseClient
                .from("expenses")
                .select("*")
                .eq(
                    "user_id",
                    user.id
                )
                .gte(
                    "expense_date",
                    range.start
                )
                .lte(
                    "expense_date",
                    range.end
                );


        if(error){

            console.error(
                "Reports expense error:",
                error
            );

            return;

        }


        const monthlyExpenses =
            Array.isArray(expenses)
                ? expenses
                : [];


        /* ==================================================
           CALCULATE TOTALS
        ================================================== */

        let jpyTotal = 0;

        let phpTotal = 0;

        let paidJPY = 0;

        let unpaidJPY = 0;


        monthlyExpenses.forEach(
            expense => {

                const amount =
                    Number(
                        expense.amount ||
                        0
                    );


                const currency =
                    expense.currency;


                const status =
                    String(
                        expense.status ||
                        ""
                    )
                    .trim()
                    .toLowerCase();


                if(currency === "JPY"){

                    jpyTotal += amount;


                    if(status === "paid"){

                        paidJPY += amount;

                    }
                    else{

                        unpaidJPY += amount;

                    }

                }


                if(currency === "PHP"){

                    phpTotal += amount;

                }

            }
        );


        /* ==================================================
           UPDATE TOTAL CARDS
        ================================================== */

        const jpyElement =
            document.getElementById(
                "reportJPYTotal"
            );


        const phpElement =
            document.getElementById(
                "reportPHPTotal"
            );


        if(jpyElement){

            jpyElement.textContent =
                formatReportCurrency(
                    "JPY",
                    jpyTotal
                );

        }


        if(phpElement){

            phpElement.textContent =
                formatReportCurrency(
                    "PHP",
                    phpTotal
                );

        }


/* ==================================================
   PAYMENT SUMMARY
================================================== */

let paidPHP = 0;

let unpaidPHP = 0;


/* ==================================================
   CALCULATE PHILIPPINES PAID / UNPAID
================================================== */

monthlyExpenses.forEach(
    expense => {

        const amount =
            Number(
                expense.amount ||
                0
            );


        const currency =
            expense.currency;


        const status =
            String(
                expense.status ||
                ""
            )
            .trim()
            .toLowerCase();


        if(currency === "PHP"){

            if(status === "paid"){

                paidPHP += amount;

            }
            else{

                unpaidPHP += amount;

            }

        }

    }
);


/* ==================================================
   PAYMENT SUMMARY ELEMENTS
================================================== */

const paidElement =
    document.getElementById(
        "reportPaidTotal"
    );


const unpaidElement =
    document.getElementById(
        "reportUnpaidTotal"
    );


/* ==================================================
   SHOW BOTH CURRENCIES
================================================== */

if(paidElement){

    paidElement.innerHTML = `

        <div>
            ¥${paidJPY.toLocaleString(
                "en-US",
                {
                    maximumFractionDigits:0
                }
            )}
        </div>

        <div>
            ₱${paidPHP.toLocaleString(
                "en-US",
                {
                    maximumFractionDigits:0
                }
            )}
        </div>

    `;

}


/* ==================================================
   SHOW BOTH CURRENCIES
================================================== */

if(unpaidElement){

    unpaidElement.innerHTML = `

        <div>
            ¥${unpaidJPY.toLocaleString(
                "en-US",
                {
                    maximumFractionDigits:0
                }
            )}
        </div>

        <div>
            ₱${unpaidPHP.toLocaleString(
                "en-US",
                {
                    maximumFractionDigits:0
                }
            )}
        </div>

    `;

}

        /* ==================================================
           MONTHLY BREAKDOWN
        ================================================== */

        renderReportBreakdown(
            monthlyExpenses,
            "JP",
            "reportJPBreakdown"
        );


        renderReportBreakdown(
            monthlyExpenses,
            "PH",
            "reportPHBreakdown"
        );


        /* ==================================================
           MONTHLY COMPARISON
        ================================================== */

        await loadReportMonthlyComparison(
            user.id
        );


    }
    catch(error){

        console.error(
            "Unexpected Reports error:",
            error
        );

    }

}

/* ==========================================================
   EXPOSE REPORTS LOADER
========================================================== */

window.loadReports =
    loadReports;

/* ==========================================================
   RENDER CATEGORY BREAKDOWN
========================================================== */

function renderReportBreakdown(
    expenses,
    country,
    containerId
){

    const container =
        document.getElementById(
            containerId
        );


    if(!container){

        return;

    }


    const countryExpenses =
        expenses.filter(
            expense =>
                expense.country ===
                country
        );


    if(!countryExpenses.length){

        container.innerHTML = `

            <div class="empty-page-state">

                <p>
                    No expenses this month.
                </p>

            </div>

        `;

        return;

    }


    /* ======================================================
       GROUP BY CATEGORY
    ====================================================== */

    const categoryTotals = {};


    let total = 0;


    countryExpenses.forEach(
        expense => {

            const category =
                expense.category ||
                expense.expense_name ||
                "Other";


            const amount =
                Number(
                    expense.amount ||
                    0
                );


            categoryTotals[category] =
                (
                    categoryTotals[category] ||
                    0
                ) +
                amount;


            total += amount;

        }
    );


    /* ======================================================
       SORT HIGHEST FIRST
    ====================================================== */

    const categories =
        Object.entries(
            categoryTotals
        )
        .sort(
            (
                [,a],
                [,b]
            ) =>
                b - a
        );


    /* ======================================================
       BUILD HTML
    ====================================================== */

    container.innerHTML =
        categories
            .map(
                (
                    [category,amount]
                ) => {

                    const percentage =
                        total > 0
                            ? (
                                amount /
                                total
                            ) *
                            100
                            : 0;


                    return `

                        <div
                            class="report-breakdown-item"
                        >

                            <div
                                class="report-breakdown-top"
                            >

                                <span
                                    class="report-breakdown-name"
                                >
                                    ${escapeExpenseHTML(
                                        category
                                    )}
                                </span>


                                <span
                                    class="report-breakdown-value"
                                >

                                    ${formatReportCurrency(
                                        country === "JP"
                                            ? "JPY"
                                            : "PHP",
                                        amount
                                    )}

                                    <span
                                        class="report-breakdown-percent"
                                    >
                                        ${percentage.toFixed(1)}%
                                    </span>

                                </span>

                            </div>


                            <div
                                class="report-breakdown-bar"
                            >

                                <div
                                    class="report-breakdown-bar-fill"
                                    style="
                                        width:${percentage}%;
                                    "
                                ></div>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


/* ==========================================================
   MONTHLY COMPARISON
========================================================== */

async function loadReportMonthlyComparison(
    userId
){

    const container =
        document.getElementById(
            "reportMonthlyComparison"
        );


    if(!container){

        return;

    }


    const months = [];


    for(
        let i = 2;
        i >= 0;
        i--
    ){

        const date =
            new Date(
                reportCurrentDate.getFullYear(),
                reportCurrentDate.getMonth() - i,
                1
            );


        months.push(date);

    }


    const startDate =
        new Date(
            months[0].getFullYear(),
            months[0].getMonth(),
            1
        );


    const endDate =
        new Date(
            reportCurrentDate.getFullYear(),
            reportCurrentDate.getMonth() + 1,
            0
        );


    const formatDate =
        date => {

            const y =
                date.getFullYear();


            const m =
                String(
                    date.getMonth() + 1
                ).padStart(
                    2,
                    "0"
                );


            const d =
                String(
                    date.getDate()
                ).padStart(
                    2,
                    "0"
                );


            return `${y}-${m}-${d}`;

        };


    const {
        data:expenses,
        error
    } =
        await supabaseClient
            .from("expenses")
            .select(
                "amount,currency,expense_date"
            )
            .eq(
                "user_id",
                userId
            )
            .gte(
                "expense_date",
                formatDate(startDate)
            )
            .lte(
                "expense_date",
                formatDate(endDate)
            );


    if(error){

        console.error(
            "Monthly comparison error:",
            error
        );

        return;

    }


    const allExpenses =
        Array.isArray(expenses)
            ? expenses
            : [];


    container.innerHTML =
        months
            .map(
                date => {

                    const year =
                        date.getFullYear();


                    const month =
                        date.getMonth();


                    const monthExpenses =
                        allExpenses.filter(
                            expense => {

                                if(
                                    !expense.expense_date
                                ){

                                    return false;

                                }


                                const expenseDate =
                                    new Date(
                                        expense.expense_date +
                                        "T00:00:00"
                                    );


                                return (
                                    expenseDate.getFullYear() ===
                                    year
                                    &&
                                    expenseDate.getMonth() ===
                                    month
                                );

                            }
                        );


                    let jpy = 0;

                    let php = 0;


                    monthExpenses.forEach(
                        expense => {

                            const amount =
                                Number(
                                    expense.amount ||
                                    0
                                );


                            if(
                                expense.currency ===
                                "JPY"
                            ){

                                jpy += amount;

                            }


                            if(
                                expense.currency ===
                                "PHP"
                            ){

                                php += amount;

                            }

                        }
                    );


                    const monthName =
                        date.toLocaleDateString(
                            "en-US",
                            {
                                month:"long"
                            }
                        );


                    return `

                        <div
                            class="report-comparison-item"
                        >

                            <span
                                class="report-comparison-month"
                            >
                                ${monthName}
                            </span>


                            <span
                                class="report-comparison-value"
                            >

                                ¥${jpy.toLocaleString(
                                    "en-US"
                                )}

                                &nbsp; | &nbsp;

                                ₱${php.toLocaleString(
                                    "en-US"
                                )}

                            </span>

                        </div>

                    `;

                }
            )
            .join("");

}


/* ==========================================================
   REPORT MONTH NAVIGATION
========================================================== */

function initializeReports(){

    const previousButton =
        document.getElementById(
            "reportPreviousMonth"
        );


    const nextButton =
        document.getElementById(
            "reportNextMonth"
        );


    if(previousButton){

        previousButton.addEventListener(
            "click",
            async () => {

                reportCurrentDate.setMonth(
                    reportCurrentDate.getMonth() - 1
                );


                updateReportMonthLabel();

                await loadReports();

            }
        );

    }


    if(nextButton){

        nextButton.addEventListener(
            "click",
            async () => {

                reportCurrentDate.setMonth(
                    reportCurrentDate.getMonth() + 1
                );


                updateReportMonthLabel();

                await loadReports();

            }
        );

    }


    updateReportMonthLabel();

}


/* ==========================================================
   REPORTS INITIALIZATION
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        /* ==================================================
           INITIALIZE MONTH
        ================================================== */

        initializeReports();


        /* ==================================================
           CHECK CURRENT ACTIVE PAGE
        ================================================== */

        const activePage =
            sessionStorage.getItem(
                "yuellaActivePage"
            );


        /* ==================================================
           LOAD REPORTS IF CURRENT PAGE IS REPORTS
        ================================================== */

        if(
            activePage ===
            "reportsPage"
        ){

            const reportsPage =
                document.getElementById(
                    "reportsPage"
                );


            if(reportsPage){

                /* ==========================================
                   HIDE OTHER PAGES
                ========================================== */

                document
                    .querySelectorAll(
                        ".app-page"
                    )
                    .forEach(
                        page => {

                            page.classList.remove(
                                "active"
                            );

                        }
                    );


                /* ==========================================
                   SHOW REPORTS
                ========================================== */

                reportsPage.classList.add(
                    "active"
                );


                /* ==========================================
                   ACTIVATE REPORTS NAV
                ========================================== */

                document
                    .querySelectorAll(
                        ".nav-item"
                    )
                    .forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );


                            if(
                                item.dataset.page ===
                                "reportsPage"
                            ){

                                item.classList.add(
                                    "active"
                                );

                            }

                        }
                    );


                /* ==========================================
                   LOAD REPORT DATA
                ========================================== */

                await loadReports();

            }

        }

    }
);

/* ==========================================================
   PDF REPORTS
   MONTHLY REPORT LIST
========================================================== */


/* ==========================================================
   LOAD PDF REPORT MONTHS
========================================================== */

async function loadPDFReports(){

    try{

        /* ==================================================
           CHECK SUPABASE
        ================================================== */

        if(
            typeof supabaseClient ===
            "undefined"
        ){

            console.error(
                "Supabase connection is not available."
            );

            return;

        }


        /* ==================================================
   WAIT FOR CURRENT USER
================================================== */

const user =
    await waitForSupabaseSession();


if(!user){

    console.log(
        "No logged-in user for PDF reports."
    );

    return;

}

        /* ==================================================
           GET EXPENSES
        ================================================== */

        const {
            data: expenses,
            error: expenseError
        } =
            await supabaseClient
                .from("expenses")
                .select(
                    "expense_date"
                )
                .eq(
                    "user_id",
                    user.id
                )
                .not(
                    "expense_date",
                    "is",
                    null
                )
                .order(
                    "expense_date",
                    {
                        ascending:false
                    }
                );


        if(expenseError){

            console.error(
                "PDF Reports expense error:",
                expenseError
            );

            return;

        }


        /* ==================================================
           CREATE UNIQUE MONTH LIST
        ================================================== */

        const monthMap =
            new Map();


        if(
            Array.isArray(expenses)
        ){

            expenses.forEach(
                expense => {

                    if(
                        !expense.expense_date
                    ){

                        return;

                    }


                    const date =
                        new Date(
                            expense.expense_date
                        );


                    if(
                        Number.isNaN(
                            date.getTime()
                        )
                    ){

                        return;

                    }


                    const year =
                        date.getFullYear();


                    const month =
                        date.getMonth();


                    const key =
                        `${year}-${String(
                            month + 1
                        ).padStart(
                            2,
                            "0"
                        )}`;


                    if(
                        !monthMap.has(key)
                    ){

                        monthMap.set(
                            key,
                            {
                                year,
                                month
                            }
                        );

                    }

                }
            );

        }


        /* ==================================================
           CONVERT TO ARRAY
        ================================================== */

        const months =
            Array.from(
                monthMap.entries()
            )
            .map(
                ([key,value]) => ({
                    key,
                    year:
                        value.year,
                    month:
                        value.month
                })
            );


        /* ==================================================
           SORT NEWEST FIRST
        ================================================== */

        months.sort(
            (
                a,
                b
            ) => {

                if(
                    a.year !==
                    b.year
                ){

                    return (
                        b.year -
                        a.year
                    );

                }


                return (
                    b.month -
                    a.month
                );

            }
        );


        /* ==================================================
           SAVE GLOBAL REPORT MONTHS
        ================================================== */

        window.yuellaPDFReportMonths =
            months;


        /* ==================================================
           RENDER REPORTS
        ================================================== */

        renderPDFReports();

    }
    catch(error){

        console.error(
            "Unexpected PDF Reports error:",
            error
        );

    }

}

/* ==========================================================
   EXPOSE PDF REPORTS LOADER
========================================================== */

window.loadPDFReports =
    loadPDFReports;

/* ==========================================================
   RENDER PDF REPORTS
========================================================== */

function renderPDFReports(){

    const reportsList =
        document.getElementById(
            "pdfReportsList"
        );


    if(!reportsList){

        return;

    }


    const searchInput =
        document.getElementById(
            "pdfReportSearch"
        );


    const searchValue =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const allMonths =
        Array.isArray(
            window.yuellaPDFReportMonths
        )
            ? window.yuellaPDFReportMonths
            : [];


    /* ==================================================
       SEARCH ALL MONTHS
    ================================================== */

    let filteredMonths =
        [...allMonths];


    if(searchValue){

        filteredMonths =
            filteredMonths.filter(
                report => {

                    const monthName =
                        new Date(
                            report.year,
                            report.month
                        )
                        .toLocaleString(
                            "en-US",
                            {
                                month:"long"
                            }
                        );


                    const label =
                        `${monthName} ${report.year}`
                        .toLowerCase();


                    return label.includes(
                        searchValue
                    );

                }
            );

    }
    else{

        /* ==============================================
           SHOW ONLY LATEST 10
        ============================================== */

        filteredMonths =
            filteredMonths.slice(
                0,
                10
            );

    }


    /* ==================================================
       EMPTY
    ================================================== */

    if(
        filteredMonths.length ===
        0
    ){

        reportsList.innerHTML = `

            <div
                class="pdf-reports-empty"
            >

                <div
                    class="pdf-reports-empty-icon"
                >
                    📄
                </div>

                <h3>
                    No reports found
                </h3>

                <p>
                    Try another month or year.
                </p>

            </div>

        `;

        return;

    }


    /* ==================================================
       RENDER CARDS
    ================================================== */

    reportsList.innerHTML =
        filteredMonths
            .map(
                report => {

                    const monthName =
                        new Date(
                            report.year,
                            report.month
                        )
                        .toLocaleString(
                            "en-US",
                            {
                                month:"long"
                            }
                        );


                    const label =
                        `${monthName} ${report.year}`;


                    return `

                        <div
                            class="pdf-report-card"
                        >

                            <span
                                class="pdf-report-month"
                            >
                                ${label}
                            </span>


                            <button
                                type="button"
                                class="pdf-report-button"
                                data-year="${report.year}"
                                data-month="${report.month}"
                            >

                                <span
                                    class="pdf-report-button-icon"
                                >
                                    ↓
                                </span>

                                PDF

                            </button>

                        </div>

                    `;

                }
            )
            .join("");

}


/* ==========================================================
   PDF REPORT SEARCH
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const searchInput =
            document.getElementById(
                "pdfReportSearch"
            );


        if(!searchInput){

            return;

        }


        searchInput.addEventListener(
            "input",
            () => {

                renderPDFReports();

            }
        );

    }
);


/* ==========================================================
   LOAD WHEN PDF REPORTS PAGE IS OPENED
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadPDFReports();

    }
);

/* ==========================================================
   DOWNLOAD MONTHLY PDF REPORT
   MOBILE PDF DOWNLOAD
========================================================== */

async function downloadPDFReport(
    year,
    month
){

    try{

        /* ==================================================
           CHECK JSPDF
        ================================================== */

        if(
            !window.jspdf ||
            !window.jspdf.jsPDF
        ){

            console.error(
                "jsPDF is not available."
            );

            alert(
                "PDF system is not ready. Please refresh the app."
            );

            return;

        }


        /* ==================================================
           CHECK SUPABASE
        ================================================== */

        if(
            typeof supabaseClient ===
            "undefined"
        ){

            console.error(
                "Supabase connection is not available."
            );

            return;

        }


        /* ==================================================
           GET CURRENT USER
        ================================================== */

        const {
            data: userData,
            error: userError
        } =
            await supabaseClient.auth.getUser();


        if(userError){

            console.error(
                "PDF user error:",
                userError
            );

            return;

        }


        const user =
            userData?.user;


        if(!user){

            alert(
                "Please log in again."
            );

            return;

        }


        /* ==================================================
           GET MONTH RANGE
        ================================================== */

        const startDate =
            `${year}-${String(
                month + 1
            ).padStart(
                2,
                "0"
            )}-01`;


        const nextMonthDate =
            new Date(
                year,
                month + 1,
                1
            );


        const endDate =
            `${nextMonthDate.getFullYear()}-${String(
                nextMonthDate.getMonth() + 1
            ).padStart(
                2,
                "0"
            )}-01`;


        /* ==================================================
           GET EXPENSES
        ================================================== */

        const {
            data: expenses,
            error: expenseError
        } =
            await supabaseClient
                .from("expenses")
                .select("*")
                .eq(
                    "user_id",
                    user.id
                )
                .gte(
                    "expense_date",
                    startDate
                )
                .lt(
                    "expense_date",
                    endDate
                )
                .order(
                    "expense_date",
                    {
                        ascending:true
                    }
                );


        if(expenseError){

            console.error(
                "PDF expense error:",
                expenseError
            );

            alert(
                "Unable to load expenses."
            );

            return;

        }


        const reportExpenses =
            Array.isArray(expenses)
                ? expenses
                : [];


        /* ==================================================
           MONTH NAME
        ================================================== */

        const monthName =
            new Date(
                year,
                month
            )
            .toLocaleString(
                "en-US",
                {
                    month:"long"
                }
            );


       /* ==================================================
   CREATE PDF
================================================== */

const {
    jsPDF
} =
    window.jspdf;


const doc =
    new jsPDF({

        orientation:
            "portrait",

        unit:
            "mm",

        format:
            "a4"

    });


doc.setFont(
    "helvetica",
    "normal"
);


/* ==================================================
   COLORS
================================================== */

const gold =
    [212,175,55];


const dark =
    [17,17,17];


const gray =
    [110,110,110];


const lightGray =
    [235,235,235];


/* ==================================================
   PAGE HEADER
================================================== */

doc.setFillColor(
    ...dark
);

doc.rect(
    0,
    0,
    210,
    32,
    "F"
);


doc.setTextColor(
    255,
    255,
    255
);

doc.setFont(
    "helvetica",
    "bold"
);

doc.setFontSize(
    17
);

doc.text(
    "YUELLA BILL TRACKER",
    15,
    14
);


doc.setFont(
    "helvetica",
    "normal"
);

doc.setFontSize(
    8
);

doc.setTextColor(
    210,
    210,
    210
);

doc.text(
    "Monthly Expense Report",
    15,
    22
);


doc.setTextColor(
    ...gold
);

doc.text(
    `${monthName} ${year}`,
    195,
    22,
    {
        align:
            "right"
    }
);


/* ==================================================
   TOTALS
================================================== */

let jpyTotal = 0;

let phpTotal = 0;

let paidJPY = 0;

let paidPHP = 0;

let unpaidJPY = 0;

let unpaidPHP = 0;


reportExpenses.forEach(
    expense => {

        const amount =
            Number(
                expense.amount ||
                0
            );


        const currency =
            String(
                expense.currency ||
                ""
            )
            .toUpperCase();


        const status =
            String(
                expense.status ||
                ""
            )
            .trim()
            .toLowerCase();


        if(
            currency ===
            "JPY"
        ){

            jpyTotal +=
                amount;


            if(
                status ===
                "paid"
            ){

                paidJPY +=
                    amount;

            }
            else{

                unpaidJPY +=
                    amount;

            }

        }


        if(
            currency ===
            "PHP"
        ){

            phpTotal +=
                amount;


            if(
                status ===
                "paid"
            ){

                paidPHP +=
                    amount;

            }
            else{

                unpaidPHP +=
                    amount;

            }

        }

    }
);


/* ==================================================
   MONEY FORMAT
================================================== */

const money =
    (
        symbol,
        value
    ) =>
        symbol +
        Number(
            value || 0
        ).toLocaleString(
            "en-US",
            {
                maximumFractionDigits:
                    0
            }
        );


/* ==================================================
   TOTAL EXPENSES TITLE
================================================== */

doc.setTextColor(
    35,
    35,
    35
);

doc.setFont(
    "helvetica",
    "bold"
);

doc.setFontSize(
    11
);

doc.text(
    "TOTAL EXPENSES",
    15,
    43
);


/* ==================================================
   JPY CARD
================================================== */

doc.setFillColor(
    250,
    250,
    250
);

doc.setDrawColor(
    ...gold
);

doc.roundedRect(
    15,
    48,
    87,
    21,
    3,
    3,
    "FD"
);


doc.setTextColor(
    ...gray
);

doc.setFont(
    "helvetica",
    "normal"
);

doc.setFontSize(
    8
);

doc.text(
    "Japan (JPY)",
    21,
    55
);


doc.setTextColor(
    ...dark
);

doc.setFontSize(
    14
);

doc.text(
    money(
        "¥",
        jpyTotal
    ),
    21,
    65
);


/* ==================================================
   PHP CARD
================================================== */

doc.setFillColor(
    250,
    250,
    250
);

doc.setDrawColor(
    ...gold
);

doc.roundedRect(
    108,
    48,
    87,
    21,
    3,
    3,
    "FD"
);


doc.setTextColor(
    ...gray
);

doc.setFontSize(
    8
);

doc.text(
    "Philippines (PHP)",
    114,
    55
);


doc.setTextColor(
    ...dark
);

doc.setFontSize(
    14
);

doc.text(
    money(
        "₱ ",
        phpTotal
    ),
    114,
    65
);


/* ==================================================
   PAYMENT SUMMARY
================================================== */

doc.setTextColor(
    35,
    35,
    35
);

doc.setFont(
    "helvetica",
    "bold"
);

doc.setFontSize(
    11
);

doc.text(
    "PAYMENT SUMMARY",
    15,
    81
);


/* ==================================================
   PAYMENT TABLE HEADER
================================================== */

doc.setFillColor(
    ...dark
);

doc.rect(
    15,
    87,
    180,
    8,
    "F"
);


doc.setTextColor(
    255,
    255,
    255
);

doc.setFont(
    "helvetica",
    "bold"
);

doc.setFontSize(
    7
);

doc.text(
    "STATUS",
    20,
    92
);

doc.text(
    "JPY",
    90,
    92
);

doc.text(
    "PHP",
    145,
    92
);


/* ==================================================
   PAID
================================================== */

doc.setTextColor(
    ...dark
);

doc.setFont(
    "helvetica",
    "normal"
);

doc.setFontSize(
    8
);

doc.text(
    "Paid",
    20,
    102
);

doc.text(
    money(
        "¥",
        paidJPY
    ),
    90,
    102
);

doc.text(
    money(
        "₱",
        paidPHP
    ),
    145,
    102
);


/* ==================================================
   PAYMENT DIVIDER
================================================== */

doc.setDrawColor(
    ...lightGray
);

doc.setLineWidth(
    0.25
);

doc.line(
    15,
    106,
    195,
    106
);


/* ==================================================
   UNPAID
================================================== */

doc.text(
    "Unpaid",
    20,
    114
);

doc.text(
    money(
        "¥",
        unpaidJPY
    ),
    90,
    114
);

doc.text(
    money(
        "₱",
        unpaidPHP
    ),
    145,
    114
);


/* ==================================================
   EXPENSE BREAKDOWN
================================================== */

let y =
    127;


doc.setTextColor(
    35,
    35,
    35
);

doc.setFont(
    "helvetica",
    "bold"
);

doc.setFontSize(
    11
);

doc.text(
    "EXPENSE BREAKDOWN",
    15,
    y
);


y += 8;


/* ==================================================
   BUILD CATEGORY DATA
================================================== */

const categories = {};


reportExpenses.forEach(
    expense => {

        const category =
            expense.category ||
            "Others";


        const currency =
            String(
                expense.currency ||
                ""
            )
            .toUpperCase();


        const amount =
            Number(
                expense.amount ||
                0
            );


        const key =
            `${currency}|${category}`;


        if(
            !categories[key]
        ){

            categories[key] = {

                category,

                currency,

                amount:
                    0

            };

        }


        categories[key].amount +=
            amount;

    }
);


/* ==================================================
   SORT CATEGORY DATA
================================================== */

const categoryRows =
    Object.values(
        categories
    )
    .sort(
        (
            a,
            b
        ) =>
            b.amount -
            a.amount
    );


/* ==================================================
   CATEGORY ROWS
================================================== */

categoryRows.forEach(
    item => {

        if(
            y > 268
        ){

            doc.addPage();

            y = 20;

        }


        const symbol =
            item.currency ===
            "JPY"
                ? "¥"
                : "₱";


        const base =
            item.currency ===
            "JPY"
                ? jpyTotal
                : phpTotal;


        const percentage =
            base > 0
                ? (
                    item.amount /
                    base
                ) *
                  100
                : 0;


        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.setFontSize(
            8
        );

        doc.setTextColor(
            ...dark
        );


        doc.text(
            String(
                item.category
            ),
            20,
            y
        );


        doc.text(
            money(
                symbol,
                item.amount
            ),
            115,
            y
        );


        doc.setTextColor(
            ...gold
        );

        doc.text(
            `${percentage.toFixed(
                1
            )}%`,
            165,
            y
        );


        /* ==========================================
           BREAKDOWN DIVIDER
        ========================================== */

        y += 3;


        doc.setDrawColor(
            225,
            225,
            225
        );

        doc.setLineWidth(
            0.25
        );

        doc.line(
            15,
            y,
            195,
            y
        );


        y += 4;

    }
);


/* ==================================================
   DIVIDER BEFORE EXPENSE RECORDS
================================================== */

y += 5;


if(
    y > 255
){

    doc.addPage();

    y = 20;

}


doc.setDrawColor(
    210,
    210,
    210
);

doc.setLineWidth(
    0.4
);

doc.line(
    15,
    y,
    195,
    y
);


/* ==================================================
   EXPENSE RECORDS
================================================== */

y += 8;


doc.setTextColor(
    35,
    35,
    35
);

doc.setFont(
    "helvetica",
    "bold"
);

doc.setFontSize(
    11
);

doc.text(
    "EXPENSE RECORDS",
    15,
    y
);


y += 8;


/* ==================================================
   EXPENSE RECORD ROWS
================================================== */

reportExpenses.forEach(
    expense => {

        if(
            y > 270
        ){

            doc.addPage();

            y = 20;

        }


        const symbol =
            String(
                expense.currency ||
                ""
            )
            .toUpperCase() ===
            "JPY"
                ? "¥"
                : "₱";


        const amount =
            Number(
                expense.amount ||
                0
            );


        const name =
            expense.expense_name ||
            expense.category ||
            "Expense";


        const status =
            expense.status ||
            "Unpaid";


        /* ==========================================
           DATE
        ========================================== */

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(
            7.5
        );

        doc.setTextColor(
            ...dark
        );

        doc.text(
            String(
                expense.expense_date ||
                ""
            ),
            15,
            y
        );


        /* ==========================================
           EXPENSE NAME
        ========================================== */

        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.text(
            String(
                name
            ).substring(
                0,
                32
            ),
            50,
            y
        );


        /* ==========================================
           AMOUNT
        ========================================== */

        doc.text(
            money(
                symbol,
                amount
            ),
            130,
            y
        );


        /* ==========================================
           STATUS
        ========================================== */

        doc.text(
            String(
                status
            ),
            170,
            y
        );


        /* ==========================================
           RECORD DIVIDER
        ========================================== */

        y += 3;


        doc.setDrawColor(
            225,
            225,
            225
        );

        doc.setLineWidth(
            0.25
        );

        doc.line(
            15,
            y,
            195,
            y
        );


        y += 4;

    }
);


/* ==================================================
   FOOTER
================================================== */

const pageCount =
    doc.internal
        .getNumberOfPages();


for(
    let page = 1;
    page <= pageCount;
    page++
){

    doc.setPage(
        page
    );


    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(
        7
    );

    doc.setTextColor(
        130,
        130,
        130
    );


    doc.text(
        `Yuella Bill Tracker • ${monthName} ${year} • Page ${page} of ${pageCount}`,
        105,
        290,
        {
            align:
                "center"
        }
    );

}


        /* ==================================================
           FILE NAME
        ================================================== */

        const fileName =
            `Yuella_Report_${monthName}_${year}.pdf`;


        /* ==================================================
           DOWNLOAD
        ================================================== */

        doc.save(
            fileName
        );

    }
    catch(error){

        console.error(
            "PDF download error:",
            error
        );

        alert(
            "Unable to create the PDF report."
        );

    }

}

/* ==========================================================
   PDF REPORT BUTTONS
========================================================== */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".pdf-report-button"
            );


        if(!button){

            return;

        }


        const year =
            Number(
                button.dataset.year
            );


        const month =
            Number(
                button.dataset.month
            );


        if(
            !Number.isFinite(year) ||
            !Number.isFinite(month)
        ){

            return;

        }


        downloadPDFReport(
            year,
            month
        );

    }
);

/* ==========================================================
   PULL TO REFRESH
   KEEP CURRENT PAGE
========================================================== */

let pullStartY = 0;

let pullCurrentY = 0;

let isPulling = false;


/* ==========================================================
   TOUCH START
========================================================== */

document.addEventListener(
    "touchstart",
    event => {

        if(
            window.scrollY !== 0
        ){

            return;

        }


        if(
            event.touches.length !== 1
        ){

            return;

        }


        pullStartY =
            event.touches[0].clientY;

        isPulling = true;

    },
    {
        passive:true
    }
);


/* ==========================================================
   TOUCH MOVE
========================================================== */

document.addEventListener(
    "touchmove",
    event => {

        if(
            !isPulling
        ){

            return;

        }


        if(
            event.touches.length !== 1
        ){

            return;

        }


        pullCurrentY =
            event.touches[0].clientY;


        const distance =
            pullCurrentY -
            pullStartY;


        if(
            distance <= 0
        ){

            return;

        }


        if(
            distance > 90
        ){

            document.body.classList.add(
                "pull-to-refresh-ready"
            );

        }
        else{

            document.body.classList.remove(
                "pull-to-refresh-ready"
            );

        }

    },
    {
        passive:true
    }
);


/* ==========================================================
   TOUCH END
========================================================== */

document.addEventListener(
    "touchend",
    () => {

        if(
            !isPulling
        ){

            return;

        }


        const distance =
            pullCurrentY -
            pullStartY;


        isPulling = false;


        document.body.classList.remove(
            "pull-to-refresh-ready"
        );


        /* ==============================================
           REFRESH
        ============================================== */

        if(
            distance > 90 &&
            window.scrollY === 0
        ){

            const activePage =
                document.querySelector(
                    ".app-page.active"
                );


            if(
                activePage &&
                activePage.id
            ){

                sessionStorage.setItem(
                    "yuellaActivePage",
                    activePage.id
                );

            }


            window.location.reload();

        }


        pullStartY = 0;

        pullCurrentY = 0;

    },
    {
        passive:true
    }
);

/* ==========================================================
   YUELLA PWA
   SERVICE WORKER REGISTRATION
========================================================== */

if(
    "serviceWorker" in navigator
){

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register(
                    "./service-worker.js"
                )
                .then(
                    registration => {

                        console.log(
                            "Yuella PWA Service Worker registered:",
                            registration.scope
                        );

                    }
                )
                .catch(
                    error => {

                        console.error(
                            "Yuella PWA Service Worker registration failed:",
                            error
                        );

                    }
                );

        }
    );

}
