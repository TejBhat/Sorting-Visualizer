

function Quick()
{
   
    document.getElementById("Time_Worst").innerText="O(N^2)";
    document.getElementById("Time_Average").innerText="Θ(N log N)";
    document.getElementById("Time_Best").innerText="Ω(N log N)";

   
    document.getElementById("Space_Worst").innerText="O(log N)";

    c_delay=0;

    quick_sort(0,array_size-1);

    enable_buttons();
}

function quick_partition (start, end)
{
    var i = start + 1;
    var piv = div_sizes[start] ;
    div_update(divs[start],div_sizes[start],"yellow");

        for(var j =start + 1; j <= end ; j++ )
        {
            
            if (div_sizes[ j ] < piv)
            {
                div_update(divs[j],div_sizes[j],"yellow");

                div_update(divs[i],div_sizes[i],"red");
                div_update(divs[j],div_sizes[j],"red");

                var temp=div_sizes[i];
                div_sizes[i]=div_sizes[j];
                div_sizes[j]=temp;

                div_update(divs[i],div_sizes[i],"red");
                div_update(divs[j],div_sizes[j],"red");

                div_update(divs[i],div_sizes[i],"#191970");
                div_update(divs[j],div_sizes[j],"#191970");

                i += 1;
            }
    }
    div_update(divs[start],div_sizes[start],"red");
    div_update(divs[i-1],div_sizes[i-1],"red");
    
    var temp=div_sizes[start];
    div_sizes[start]=div_sizes[i-1];
    div_sizes[i-1]=temp;

    div_update(divs[start],div_sizes[start],"red");
    div_update(divs[i-1],div_sizes[i-1],"red");

    for(var t=start;t<=i;t++)
    {
        div_update(divs[t],div_sizes[t],"green");
    }

    return i-1;
}

function quick_sort (start, end )
{
    if( start < end )
    {
       
        var piv_pos = quick_partition (start, end ) ;     
        quick_sort (start, piv_pos -1);
        quick_sort (piv_pos +1, end) ;
    }
 }

