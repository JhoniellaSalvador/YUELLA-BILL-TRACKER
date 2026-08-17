/* ==========================================================
   YUELLA BILL TRACKER
   SUPABASE CONNECTION
========================================================== */

const SUPABASE_URL =
    "https://jguvfhpyiutftwmygruz.supabase.co";


const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_paiJM617kXWw0wDevmgMmw_n2MOhkmJ";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

    /* ==========================================================
   SUPABASE CONNECTION TEST
========================================================== */

async function testSupabaseConnection(){

    try{

        const {
            data,
            error
        } =
            await supabaseClient
                .from("expenses")
                .select("id")
                .limit(1);


        if(error){

            console.error(
                "Yuella Supabase connection error:",
                error
            );

            return false;

        }


        console.log(
            "Yuella Supabase connected successfully.",
            data
        );

        return true;

    }

    catch(error){

        console.error(
            "Yuella Supabase connection failed:",
            error
        );

        return false;

    }

}


/* ==========================================================
   RUN CONNECTION TEST
========================================================== */

testSupabaseConnection();
