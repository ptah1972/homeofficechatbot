let count = 0;
let JobsalaryTypeFields = "";
let workingStyleFields = "";
let JobcontractTypeFields = "";
let JobworkfromhomeFields = "";
let JoblocationFields = "";
let JobCareerFields = "";
let workingHourFields = "";
let JobFamilyFields = "";
let JobTagFields = "";
let previoussortoption = "";

window.addEventListener('DOMContentLoaded', (event) => {
    ////////////////////////////////////////// setting filters //////////////////////////
    jt = Array();
    $('.jobTagfilterCheckbox:checkbox:checked').each(function() {
        jt.push($(this).val());
    });
    JSON.stringify(jt);
     JobTagFields = jt;
    jf = Array();
    $('.jobFamilyfilterCheckbox:checkbox:checked').each(function() {
        jf.push($(this).val());
    });
    JSON.stringify(jf);
     JobFamilyFields = jf;
    wh = Array();
    $('.workingHourfilterCheckbox:checkbox:checked').each(function() {
        wh.push($(this).val());
    });
    JSON.stringify(wh);
     workingHourFields = wh;
    ch = Array();
    $('.jobCareerfilterCheckbox:checkbox:checked').each(function() {
        ch.push($(this).val());
    });
    JSON.stringify(ch);
     JobCareerFields = ch;


    lo = Array();
    $('.joblocationfilterCheckbox:checkbox:checked').each(function() {
        lo.push($(this).val());
    });
    JSON.stringify(lo);
     JoblocationFields = lo;

    wfh = Array();
    $('.jobwfhfilterCheckbox:checkbox:checked').each(function() {
        wfh.push($(this).val());
    });
    JSON.stringify(wfh);
     JobworkfromhomeFields = wfh;

    ct = Array();
    $('.jobcontractTypefilterCheckbox:checkbox:checked').each(function() {
        ct.push($(this).val());
    });
    JSON.stringify(ct);
     JobcontractTypeFields = ct;

    workstyle = Array();
    $('.workingStylefilterCheckbox:checkbox:checked').each(function() {
        workstyle.push($(this).val());
    });
    JSON.stringify(workstyle);
     workingStyleFields = workstyle; 

    st = Array();
    $('.jobsalaryTypefilterCheckbox:checkbox:checked').each(function() {
        st.push($(this).val());
    });
    JSON.stringify(st);
     JobsalaryTypeFields = st;
    ////////////////////////////////////////// /setting filters //////////////////////////
    // console.log('DOM fully loaded and parsed');
    let ajaxform = document.querySelector("#searchbox-form");
    let isajaxon = "";
    if(ajaxform){
        isajaxon = ajaxform.getAttribute("isajaxon");
    }
    
    if(isajaxon){
        
        if(isajaxon == "on"){
            
            //console.log('Ajax is on');
            let sortingjobsoptions = document.querySelectorAll("#sortingjob option");
            for(let i = 0; i < sortingjobsoptions.length; i ++){
                sortingjobsoptions[i].setAttribute("order","ASC");
                // sortingjobsoptions[i].addEventListener("click",function(){
                //     alert("clicked");
                //     let sortvalueindex = document.getElementById('sortingjob').selectedIndex;
                //     let sortvalueattrorder = document.getElementById('sortingjob').options[sortvalueindex].getAttribute('order');
                //        if(sortvalueattrorder == "ASC"){
                //         document.getElementById('sortingjob').options[sortvalueindex].updateAttribute('order',"DESC");
                //        }
                //        else{
                //         document.getElementById('sortingjob').options[sortvalueindex].updateAttribute('order',"ASC");
                //        }
                // });
            }
            
            
            
            document.querySelector("#ask-question").setAttribute('page',"1");
            ajaxform.addEventListener('submit', function (e) {
                e.preventDefault();
                let numbjobs = document.querySelector(".numberofjobs");
                numbjobs.setAttribute("aria-live","polite");
                numbjobs.innerHTML  = "Searching...";
                // console.log("form submitted");
             
              
                
                  const data = new FormData();
                  
                  
                   let sortvalueindex = document.getElementById('sortingjob').selectedIndex;
                   let sortvalueattrval = document.getElementById('sortingjob').options[sortvalueindex].getAttribute('val');
                   
                  if(!sortvalueattrval){
                    sortvalueattrval = "";
                  }
                  // getting sorting order
                  let sortvalueattrorder = document.getElementById('sortingjob').options[sortvalueindex].getAttribute('order');
                   
                  if(!sortvalueattrorder){
                    sortvalueattrorder = "ASC";
                  }
                //   console.log("order");
                //   console.log(sortvalueattrval);
                //   console.log(previoussortoption);
                    if(sortvalueattrval == previoussortoption){
                        sortvalueattrorder = "DESC";

                    }
                    else{
                        previoussortoption = sortvalueattrval;
                    }
                //   console.log(sortvalue);
                  data.append( 'action', 'ajax_js_get_jobs' );
                  data.append( 'nonce', ajax_js_vars.nonce );
                  data.append( 'is_user_logged_in', ajax_js_vars.is_user_logged_in );
                  data.append( 'is_single', ajax_js_vars.is_single );
                  data.append( 'page', document.querySelector("#ask-question").getAttribute('page'));
                  data.append( 'perpage', "10");
                  data.append( 'orderwith', sortvalueattrorder);
                  data.append( 'orderby', sortvalueattrval);
                  data.append( 'keyword', document.querySelector("#ask-question").value);
                  data.append( 'jobsalaryType', JobsalaryTypeFields);
                  data.append( 'workingStyleFields', workingStyleFields);
                  data.append( 'jobcontractType', JobcontractTypeFields);
                  data.append( 'JobworkfromhomeFields', JobworkfromhomeFields);
                  data.append( 'location', JoblocationFields);
                //   data.append( 'JobCareerFields', JobCareerFields);
                  data.append( 'workingHour', workingHourFields);
                  data.append( 'jobFamily', JobFamilyFields);
                  data.append( 'jobTag', JobTagFields);
//                   let JobsalaryTypeFields = "";
// let workingStyleFields = "";
// let JobcontractTypeFields = "";
// let JobworkfromhomeFields = "";
// let JoblocationFields = "";
// let JobCareerFields = "";
// let workingHourFields = "";
// let JobFamilyFields = "";
// let JobTagFields = "";
              
                  fetch(ajax_js_vars.ajax_url, {
                    method: "POST",
                    credentials: 'same-origin',
                    body: data
                  })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data) {
                        // console.log("ajax done");
                        document.querySelector("#sortingjob option").selected = "selected";
                        let numberofpages = Math.ceil(data.totalpost/10);
                        let current = document.querySelector("#ask-question").getAttribute('page');
                        if(data.jobsarray.length > 0){
                            numbjobs.innerHTML  = data.totalpost+" "+document.querySelector("#ask-question").value+" Jobs"+"<span class='screen-reader-text'>Page number "+current+"</span>";
                       
                        }
                        else{
                            numbjobs.innerHTML  = data.totalpost+" "+document.querySelector("#ask-question").value+" Jobs";
                       
                        }
                        //let paginationnumbers = pageNumbers(numberofpages, current);
                        var html = "";
                        let vjcoun = 0;
                        data.jobsarray.forEach((v)=>{
                            //console.log(v.jobtags);
                            let jobtags = "";
                            vjcoun++;
                            v.jobtags.forEach((vj)=>{
                                jobtags = jobtags+vj.name;
                            });
                            let svgdownloaded = "";
                            file_get_contents_svg(v.RoleIconUrl,"ricon"+vjcoun);
                            //  fetch(v.RoleIconUrl, {
                            //     method: "GET",
                            //     credentials: 'same-origin'
                            //   })
                            //   .then((response) => response.blob())
                            //   .then((blob) => {
                            //     var url = window.URL.createObjectURL(blob);
                            //     var a = document.createElement('a');
                            //     a.href = url;
                            //     a.download = "filename.xlsx";
                            //     document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                            //     a.click();    
                            //     a.remove();  //afterwards we remove the element again    
                            //   })
                            //   .catch((e)=>{
                            //       console.log("Error");
                            //     });
                            html = html+`
                            <li class="${v.RoleColorTheme}"><a href="${v.slug}" class="hover-color">
                                
                            <!-- for role heading start -->
                            
                            <div class="job-role">
                                <span class="role-icon ricon${vjcoun} svgColor">
                                
                                </span>
                                <span class="role-name text-color">${v.RoleTitle}</span>
                            </div>
                                                            <!-- for role heading end -->

                            <div class="job-list-col1">
                                <div class="job-title">${v.title}</div>
                                                                    
                                <div class="feature feature-reqid">
                                    <span class="feature-name">Req ID</span>
                                    <span class="feature-value">${v.reqid}</span>
                                </div>
                            </div>

                            <div class="job-list-col2">
                                <div class="feature">
                                    <span class="feature-name">Salary:</span>
                                    <span class="feature-value">${v.jobadvertisedsalary}</span>
                                </div>                                  
                                <div class="feature">
                                    <span class="feature-name">Closing date:</span>
                                    <span class="feature-value">${v.closingdate}</span>
                                </div>
                            </div>

                            <div class="job-list-col3">
                                <div class="feature">
                                    <span class="feature-name">Location:</span>
                                    <span class="feature-value">${v.customlocation}</span>
                                </div>
                                <div class="feature">
                                    <span class="feature-name">Hours:</span>
                                    <span class="feature-value">${v.hours}</span>
                                </div>
                                <div class="feature">
                                    <span class="feature-name">Role:</span>
                                    <span class="feature-value">${jobtags}</span>
                                </div>
                            </div>

                            <div class="job-list-col4">
                                <div class="arrow">Go to ${v.title}</div>
                            </div>
                        </a>
                    </li>
                                        `;
                        });
                        //numbjobs.innerText = data.message;
                        document.querySelector(".job-list").innerHTML = html;
                        // job list added
                        let htmlul = "<ul id='ajaxpaginationid'>";
                        if(current > 1){
                            htmlul = htmlul+`<li class="pagination-border-last"><a value="${((parseInt(current)-1) < 1)?1:parseInt(current)-1}">
                        <svg enable-background="new 0 0 482.239 482.239" height="20" viewBox="0 0 482.239 482.239" width="20" xmlns="https://www.w3.org/2000/svg"><path d="m206.812 34.446-206.812 206.673 206.743 206.674 24.353-24.284-165.167-165.167h416.31v-34.445h-416.31l165.236-165.236z"></path></svg><span class="screen-reader-text">Previous Page</span>
                        </a></li>`;
                        }
                        
                        pageNumbers(numberofpages, current).forEach((v)=>{
                            if(v > 0 || v == "..."){

                            
                                if(v == current){
                                    htmlul = htmlul+"<li class='active' >";
                                }
                                else{
                                    htmlul = htmlul+"<li>";
                                }
                                
                                if(v == "..."){
                                // console.log("...");
                                htmlul = htmlul+"<span>...</span>";
                                }
                                else{
                                // console.log(v);
                                    htmlul = htmlul+"<a href='#' value='"+v+"'>"+v+"</span>";
                                }
                                htmlul = htmlul+"</li>";
                            }
                        });
                        if(current < numberofpages){
                        htmlul = htmlul+`<li class="pagination-border-last"><a value="${((parseInt(current)+1) >numberofpages )?numberofpages:parseInt(current)+1}">
                        <svg enable-background="new 0 0 482.238 482.238" height="20" viewBox="0 0 482.238 482.238" width="20" xmlns="https://www.w3.org/2000/svg"><path d="m275.429 447.793 206.808-206.674-206.74-206.674-24.354 24.287 165.164 165.164h-416.307v34.446h416.306l-165.231 165.231z"></path></svg><span class="screen-reader-text">Next Page</span>
                        </a></li>`;
                        }
                        htmlul = htmlul+"</ul>";
                        // console.log(htmlul);
                        // var d = document.createElement( 'div' );
                        // //d.setAttribute("class","navigation-pagination");
                        // document.querySelector(".apply-jobs-listing").appendChild(d);
                        let paginationli = document.querySelector(".navigation-pagination");
                        paginationli.innerHTML = htmlul;
                        let paginationlia =  document.querySelectorAll(".navigation-pagination ul li");
                        for(let i = 0; i < paginationlia.length; i++){
                            paginationlia[i].querySelector('a').addEventListener("click",function(e){
                                e.preventDefault();
                                document.querySelector("#ask-question").setAttribute('page',paginationlia[i].querySelector('a').getAttribute('value'));
                                paginationlia[i].className  = "active";
                                document.getElementById("search-btn").click();
                            });
                        }
                        
                    }
                    else{
                        numbjobs.innerHTML = "No jobs found";
                        document.querySelector(".job-list").innerHTML = "";
                    }
                    let upage = document.querySelector("#ask-question").getAttribute('page');
                  let uperpage = "10";
                  let uorderwith = sortvalueattrorder;
                  let uorderby = sortvalueattrval;
                  let ukeyword = document.querySelector("#ask-question").value;
                 //JobsalaryTypeFields;
                //   data.append( 'workingStyleFields', workingStyleFields);
                //   data.append( 'jobcontractType', JobcontractTypeFields);
                //   data.append( 'JobworkfromhomeFields', JobworkfromhomeFields);
                //   data.append( 'location', JoblocationFields);
                // //   data.append( 'JobCareerFields', JobCareerFields);
                //   data.append( 'workingHour', workingHourFields);
                //   data.append( 'jobFamily', JobFamilyFields);
                //   data.append( 'jobTag', JobTagFields);
                let reloadurl = "";
                if(upage > 1){                 
                     reloadurl = "/apply/page/"+upage+"?keyword="+ukeyword+"&jobTag="+JobTagFields+"&jobFamily="+JobFamilyFields+"&workingHour="+workingStyleFields+"&jobcontractType="+JobcontractTypeFields+"&jobsalaryType="+JobsalaryTypeFields+"&location="+JoblocationFields+"&orderwith="+uorderwith+"&orderby="+uorderby;     
                }
                else{
                     reloadurl = "/apply?keyword="+ukeyword+"&jobTag="+JobTagFields+"&jobFamily="+JobFamilyFields+"&workingHour="+workingStyleFields+"&jobcontractType="+JobcontractTypeFields+"&jobsalaryType="+JobsalaryTypeFields+"&location="+JoblocationFields+"&orderwith="+uorderwith+"&orderby="+uorderby;  
                }
                    add_url_without_reload(reloadurl);
                  })
                  .catch((error) => {
                    //console.log('[WP Pageviews Plugin]');
                    console.error(error);
                  });
                
              });
             // document.getElementById("searchbox-form").submit();
             /////////////////////////////////////// Pagination with ajax ///////////////////////////////////////
// funciton to generate numbers for pagination
function pageNumbers(count, current) {
    var shownPages = 3;
    var result = [];
    if(count < 2){
        result.push(1);
        return result;
    }
    count = parseInt(count);
    current = parseInt(current);
    
    if (current > count - shownPages) {
        result.push(count - 2, count - 1, count);
    } else {
        result.push(current, current + 1, current + 2, '...', count);
    }
    return result;
}

document.getElementById('ask-question').addEventListener('change', function(obj) {
    document.querySelector("#ask-question").setAttribute('page','1');
});
document.getElementById('sortingjob').addEventListener('change', function() {
    
    document.querySelector("#ask-question").setAttribute('page','1');
    document.getElementById("search-btn").click();
    
    //console.log('You selected: ', document.getElementById('sortingjob').options[document.getElementById('sortingjob').selectedIndex].getAttribute('val'));
  });
//   var arrrr = [];
// var checkValue = function() {
//   const mySelect = document.getElementById("sortingjob");
//   let currentoption = mySelect.options[mySelect.selectedIndex];
//   let currentValue = currentoption.value;

//   if (arrrr.includes(currentValue)) {
//     console.log("already selected");
//   } else {
//     arrrr.push(currentValue);
//     //console.log(currentValue);
//   }
// }
  let allfilters = document.querySelectorAll('.filterCheckbox');
  for(let i = 0; i < allfilters.length; i++){
    allfilters[i].addEventListener('change', function() {
        jt = Array();
        $('.jobTagfilterCheckbox:checkbox:checked').each(function() {
            jt.push($(this).val());
        });
        JSON.stringify(jt);
         JobTagFields = jt;
        jf = Array();
        $('.jobFamilyfilterCheckbox:checkbox:checked').each(function() {
            jf.push($(this).val());
        });
        JSON.stringify(jf);
         JobFamilyFields = jf;
        wh = Array();
        $('.workingHourfilterCheckbox:checkbox:checked').each(function() {
            wh.push($(this).val());
        });
        JSON.stringify(wh);
         workingHourFields = wh;
        ch = Array();
        $('.jobCareerfilterCheckbox:checkbox:checked').each(function() {
            ch.push($(this).val());
        });
        JSON.stringify(ch);
         JobCareerFields = ch;
    
    
        lo = Array();
        $('.joblocationfilterCheckbox:checkbox:checked').each(function() {
            lo.push($(this).val());
        });
        JSON.stringify(lo);
         JoblocationFields = lo;
    
        wfh = Array();
        $('.jobwfhfilterCheckbox:checkbox:checked').each(function() {
            wfh.push($(this).val());
        });
        JSON.stringify(wfh);
         JobworkfromhomeFields = wfh;
    
        ct = Array();
        $('.jobcontractTypefilterCheckbox:checkbox:checked').each(function() {
            ct.push($(this).val());
        });
        JSON.stringify(ct);
         JobcontractTypeFields = ct;
    
        workstyle = Array();
        $('.workingStylefilterCheckbox:checkbox:checked').each(function() {
            workstyle.push($(this).val());
        });
        JSON.stringify(workstyle);
         workingStyleFields = workstyle; 
    
        st = Array();
        $('.jobsalaryTypefilterCheckbox:checkbox:checked').each(function() {
            st.push($(this).val());
        });
        JSON.stringify(st);
         JobsalaryTypeFields = st;
    
        // $('#filter-form').submit();
        document.querySelector("#ask-question").setAttribute('page','1');
        document.getElementById("search-btn").click();
    });
    
    
  }
  document.querySelector(".clearfilters").addEventListener("click",function(){
        let filterCheckbox = document.querySelectorAll(".filterCheckbox");
        for(let i=0; i<filterCheckbox.length; i++){
            filterCheckbox[i].checked = false;
        }
        document.querySelector("#ask-question").setAttribute('page','1');
        document.getElementById("search-btn").click();
    });
    if(count == 0){
        // do some ontime tasks here
        document.getElementById("search-btn").click();
     }

     function file_get_contents_svg(filename, id) {
        fetch(filename).then((resp) => resp.text()).then(function(data) {
            document.querySelector("."+id).innerHTML = data;
        });
    }
    function add_url_without_reload(url){
        window.history.pushState('', '', url);
    }
        }
    }


     count++;



});
