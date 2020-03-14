/*
    NACC: The N.A. Cleatime Calculator

    Version: 2.0.10
    
    See changelog.txt for details of changes

    This is a cooperative venture of the MAGNAWS Community Commons - http://wiki.magnaws.com/

    This is a real purty cleantime calculator that displays a whole
    bunch of nicely-rendered keytags to commemorate your cleantime.

    This uses JavaScript. It is 100% JavaScript, so it's easy to steal
    and re-use. There's no server-side technology (like PHP or ASP) involved.

    You can choose among various themes including Basic Text Blue, It Works- How and Why and Just For Today.

    More themes may be added later and, if you are comfortable with CSS (Cascading Style Sheets),
    you can make your own theme.

    HOW TO USE THIS:

    You first need to include this file in your <head> section. You also should include the base
    stylesheet file and one of the theme style sheets.

    This example assumes that the calling file is one directory level above the NACC directory:

        <head>
            .
            .
            .
            <link rel="stylesheet" href="../../nacc.1.6/nacc/nacc/nacc.css" type="text/css" />
            <link rel="stylesheet" href="../../nacc.1.6/nacc/nacc/nacc_theme_bt.css" type="text/css" />
            <script type="text/javascript" src="../../nacc.1.6/nacc/nacc/nacc.js"></script>
            .
            .
            .
        </head>

    NOTE:   If you are on a PHP server, you can include a different file that will trim all this
            text out of the JavaScript file, and give you a much smaller file. In that case, the
            script would look like this:

                <script type="text/javascript" src="../../nacc.1.6/nacc/nacc/nacc.js.php"></script>

    The best way to invoke it is to put a call to this function in an onload() event:

        <body onLoad="NACC_CleanTime(pContainerId, pPathToNACC, pUseCookie, pChained, pHideTags)">

    Where:
        pContainerId:   string - ID of the containing div on the html page.

                        This needs to be a valid DOM ID of an empty <div> or other block level
                        HTML element. The contents of this element will be completely
                        replaced by the NACC.

                        For example:

                            <div id="my_blank_div"></div>

                        Would need:

                            NACC_CleanTime('my_blank_div', pPathToNACC, pUseCookie, pChained, pHideTags)

        pPathToNACC:    string - path to location of 'nacc' directory (e.g. "/third/party/apps").

                        The NACC needs to have all its files kept together in one directory. This
                        parameter is a relative HTTP (URL address-style) path from the page that
                        is using the NACC to the directory that contains the NACC.

                        For example:

                            public_html
                                |
                                cleantime_calc.html <- Contains the code that calls the NACC
                                    The <head> code would look like this:
                                        <link rel="stylesheet" href="../../nacc.1.6/nacc/special_code/nacc/nacc.css" type="text/css" />
                                        <script type="text/javascript" src="../../nacc.1.6/nacc/special_code/nacc/nacc.js"></script>
                                |
                                special_code                    <- An in-between directory
                                    |
                                    nacc                        <- The NACC directory
                                        |
                                        nacc.js                 <---
                                        |                          |
                                        nacc.css                <---
                                        |                          |-------- These are the only files/directories
                                        nacc_theme_?.css    	<---         necessary for normal use.
                                        |                          |
                                        images                  <---

                        Would need:

                            NACC_CleanTime(pContainerId, 'special_code/nacc', pUseCookie, pChained, pHideTags)

        pUseCookie    boolean - store cleandate in a cookie

                        Some people might not like this if they have privacy concerns. By default, cookies
                        are not stored. What a stored cookie does is store the visitor's cleandate and
                        tag display preference. That's all. There's actually no danger to privacy, and no
                        really insidious information is stored (unless the visitor likes to use their
                        cleandate as a password).

                        In order to store cookies, you can set this to true:

                            NACC_CleanTime(pContainerId, pPathToNACC, true, pChained, pHideTags)

        pChained:      boolean - whether to display key tags vertically (chained together) or horizontally

                        This is the initial (default) method of arranging the tags. Chained means that they
                        are displayed as one long vertical chain. Not chained is what we call a "tabletop"
                        arrangement, where they are laid out in horizontal rows.

                        If the visitor has a cookie, this parameter will be ignored, and the visitor's
                        preference will be honored instead. If the visitor does not have a cookie, then this
                        will always be the initial setting.

                        In order to have the results specified as a chain by default:

                            NACC_CleanTime(pContainerId, pPathToNACC, pUseCookie, true, pHideTags)

        pHideTags:     boolean - whether to hide key tag display

                        You might not want to disply the key tags in cases where bandwidth or
                        other issues come into play.

                        In order to hide the key tags:

                            NACC_CleanTime(pContainerId, pPathToNACC, pUseCookie, pChained, true)

        You can ignore all but the first parameter, but default values will be used. The first parameter
        must always be specified.

            NACC_CleanTime('my_blank_div')
                Will result in no cookies, tabletop, and the file must be in the NACC directory.

            NACC_CleanTime('my_blank_div', 'nacc')
                Will result in no cookies, tabletop, and the file must be one above the NACC directory.

            NACC_CleanTime('my_blank_div', 'nacc', true)
                Will result in cookies, tabletop, and the file must be one above the NACC directory.

            NACC_CleanTime('my_blank_div', 'nacc', true)
                Will result in cookies, tabletop, and the file must be one above the NACC directory.

            NACC_CleanTime('my_blank_div', 'nacc', true, true)
                Will result in cookies, chained, and the file must be one above the NACC directory.

            NACC_CleanTime('my_blank_div', 'nacc', true, true, true)
                Will result in cookies, chained, hide key tags and the file must be one above the NACC directory.

        The default ("NACC_CleanTime('my_blank_div')") is the equivalent of this:
            NACC_CleanTime('my_blank_div', '', false, false, false, false)

    THE 90-DAY ODDITY:
        When the visitor passes 90 days, the calculator stops counting days for keytags, and, instead, counts dates.
        For example, a visitor may have 90 days, but not 3 months, or they may have 91 days, and 3 months and 2 days.
        This is actually expected behavior.

    NOTE:   We use an interesting system to keep all the cleantime stuff in its own context. This prevents it
            from interfering with other JavaScript you may have.

            Basically, the entire cleantime calculator lives inside the NACC_CleanTime() function, so the only
            exposed interface is that function name, and the DOM elements generated by the code.
            
    NOTE:   As of Version 1.7, we have a new purple "decades" cleantime tag. This is not (yet) a NAWS-produced item,
            but it's worth mentioning here. It is turned off by default. In order to enable it, set the gUseDecadesTag
            variable to true.
            
    NOTE:	As of Version 2.0, we support the Persian (Iranian) "Solar" calendar.
*/
function NACC_CleanTime ( pContainerId, pPathToNACC, pUseCookie, pChained, pHideTags ) {

	/******************************* SYSTEM GLOBALS *******************************/
	// These are some settings that you can specify to customize the NACC.
	
    // Set this to true to use the purple "Decades" tag for every 10 years after 10 (20, 30, etc.)
    var gUseDecadesTag = false;
    
    // Select the calendar type ("Persian", "Gregorian" or null, which equates to "Gregorian")
    // Gregorian is the standard calendar used throughout the West. It is the default calendar.
    // Persian is the Shamsi calendar, used in Iran, Aghanistan and other nations (also called the "Solar" calendar)
    var gCalendarType = "Gregorian";
//	gCalendarType = "Persian";	// Uncomment this line to turn on the Persian calendar.

	/******************************* LOCALIZATION SECTION *******************************
        BEGIN LOCALIZATION SECTION

        These globals are the displayed strings. This means they need to be changed in order to make this work in
        languages other than English.

        NOTE- the function BuildCleantimeMessage() has NOT been localized!!! If you need a non-English message,
        you'll have to change it accordingly until we get to it.
	/******************************************************************************/

    var gTitle_lang = null;
    var gPrompt_lang = null;
    var gCalcBtn_lang = null;
    var gMonthsFull_lang = null;
    var gResetLinkText_lang = null;
    var gChangeLinkText_lang = null;
    var gFutureWarning_lang = null;
    
    switch ( gCalendarType ) {
    	default:
    		gMonthsFull_lang = new Array ('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
			gTitle_lang = 'NA Cleantime Calculator';
			gPrompt_lang = 'Please enter your Clean Date';
			gCalcBtn_lang = 'Calculate';
			gResetLinkText_lang = new Array('Click to reset your cleantime', 'Reset Cleantime');
			gChangeLinkText_lang = new Array('Click to change how key tags are laid out', 'Change Key Tag Layout');
			gFutureWarning_lang = 'Error! Clean Date is in the future!';
    	break;
    	
    	case "Persian":
    		gMonthsFull_lang = new Array ('فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد / امرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسپند / اسفند');
			gTitle_lang = 'محاسبه کننده سن پاکی';
			gPrompt_lang = 'تاریخ شروع پاکی خود را وارد کنید';
			gCalcBtn_lang = 'حساب کن';
			gResetLinkText_lang = new Array('Click to reset your cleantime', 'پاک کردن');
			gChangeLinkText_lang = new Array('Click to change how key tags are laid out', 'تغییر دادن چیدمان');
			gFutureWarning_lang = 'Error! Clean Date is in the future!';
    	break;
    }

    /********************
        This function constructs a plain-English phrase that summarizes the results. It would need to be
        completely rewritten for non-English implementations.

        Parameters:
            totalDays  integer - The total number of days between the cleandate and today.
            years      integer - The total number of years between the cleandate and today.
            months     integer - The total number of months between the cleandate's last year anniversary and today
            days       integer - The total number of days between the cleandate's last year/month anniversary and today
    */
    function BuildCleantimeMessageGregorian (totalDays, years, months, days) {
        var msg = 'You have been clean for '+ totalDays;

        if (totalDays > 90) {
        	msg += ' total';
		}
	
        if (totalDays > 1) {
            msg += ' days';
        } else {
            if ( totalDays ) {
                msg = 'Congratulations! You have been clean for one day!';
            } else {
                msg = 'Welcome to NA! Pick up a white tag, and keep coming back!';
            }
        }

        if (years || months || days) {
            msg += ', which is ';
            if (years > 0) {
                msg += years + ' year';
                if (years > 1)  msg += 's';
            }

            if (months > 0) {
                if (years) {
                    if (!days) {
                        msg += ' and ';
                    } else {
                        msg += ', ';
                    }
                }
                msg += months + ' month';
                if (months > 1) msg += 's';
            }

            if (days > 0) {
                if (years || months) msg += ' and ';
                msg += days + ' day';
                if (days > 1) msg += 's';
            }
        }

        msg += '!';

        return msg;
    }
    
	/******************
		This is a Persian localized version of the cleantime message.
	*/
    function BuildCleantimeMessagePersian (totalDays, years, months, days) {
        var msg = 'پاکی شما عبارتست از'+ totalDays;

        if (totalDays > 90) {
        	msg += ' ';
        }

        if (totalDays > 1) {
            msg += 'روز';
        } else {
            if ( totalDays ) {
                msg = 'مبارک باشه! پاکی شما عبارتست از یک روز!';
            } else {
                msg = 'به انجمن معتادان گمنام خوش آمدید ! بازهم بیایید';
            }
        }

        if (years || months || days) {
            msg += ', و یا  ';
            if (years > 0) {
                msg += years + ' سال';
                if (years > 1)  msg += ' ';
            }

            if (months > 0) {
                if (years) {
                    if (!days) {
                        msg += ' و ';
                    } else {
                        msg += 'و ';
                    }
                }
                msg += months + ' ماه';
                if (months > 1) msg += ' ';
            }

            if (days > 0) {
                if (years || months) msg += ' و ';
                msg += days + ' روز';
                if (days > 1) msg += ' ';
            }
        }

        msg += '!';

        return msg;
    }

    /*****************************************************
        END LOCALIZATION SECTION
	/***********************************************************************************/

    // This is today.
    var gTodayDate;
	var gTodayYear;
	var gTodayMonth;
	var gTodayDay;
    
    // Set the globals that reflect the input parameters.
    var gContainerEl = document.getElementById(pContainerId);

    if (gContainerEl == null) {
        alert('ERROR: There is no element on the page whose ID is "' + pContainerId + '"!');
        return;
    }

     // Fix pPathToNACC directory param before setting global var
     // Fixes missing or multiple forward slashes at end
     // Gives end user leeway if they forget to add one
     if (typeof(pPathToNACC) == 'string') {
          // Trim white space from beginning and end
          pPathToNACC = pPathToNACC.replace(/^\s+|\s*$/g, '');

          if (pPathToNACC.length > 0) {
                // Trim forward slash(es) from end
                pPathToNACC = pPathToNACC.replace(/\/*$/, '');

                // Add forward slash back
                pPathToNACC += '/';
          }
     }
     else {
          pPathToNACC = '';
     }

    var gPathToNACC = pPathToNACC;

    // Set global variable based on param passed to function
    var gChained = (pChained == true);

    // Set global variable based on param passed to function
    var gCookieName = (pUseCookie == true) ? 'nacc_cleantime' : '';

    // Set global variable based on param passed to function
    var gHideTags = (pHideTags == true);

    // This is one day, in milliseconds. It is needed to break down the getTime() results.
    var gDay = (24 * 60 * 60 * 1000);

    // Determine whether the browser is IE6 or older
    var gOldIE = (NACC_browser() == 'msie');
    
    // These reflect the current cleandate, parsed into a simple format.
    var gSelMonth;
    var gSelDay;
    var gSelYear;

    /********************
    	Convert the given date to the Gregorian Calendar from whatever calendar is selected as local.
		
		Returns:
			A new Date object, with the Gregorian date.
    */
	function To_Gregorian (in_year, in_month, in_day ) {
		switch ( gCalendarType ) {
			default:
				var td_date = new Date();
				td_date.setFullYear(in_year, in_month - 1, in_day);
				return td_date;
			break;
			
			case "Persian":
				return solarToGregorian ( in_year, in_month, in_day );
			break;
		}
		
		return null;
	}

    /********************
    	Convert the given date to the local Calendar from the Gregorian Calendar.
 		
		Returns:
			An array, with [0] = year, [1] = month, [2] = day of month (In Local Calendar)
   */
	function To_Local (in_year, in_month, in_day) {
		switch ( gCalendarType ) {
			default:
				return new Array( in_year, in_month, in_day );
			break;
			
			case "Persian":
				return gregorianToSolar ( in_year, in_month, in_day );
			break;
		}
		
		return null;
	}

    /********************
    	Convert the given date to a Julian day.
 		
		Returns:
			An integer (The Julian day).
   */
	function To_JulianDay (in_year, in_month, in_day) {
		switch ( gCalendarType ) {
			default:
				return gregorianToJd (in_year, in_month, in_day);
			break;
			
			case "Persian":
				return persianToJd (in_year, in_month, in_day);
			break;
		}
		
		return null;
	}

    /********************
        Given a month and a year, returns the number of days in that month.

        Parameters:
            inYear  integer - The year in question
            inMonth integer - The month of that year (0-based, so it is 0-11).
            inGregorian boolean (optional -default is false). 	Set to true if the calculation should ignore localization
            													and work in Gregorian.

        Function Return:
            integer - The number of days in the given month.
    */
    function DaysInMonth ( inYear, inMonth ) {
		switch ( gCalendarType ) {
			default:
		        return 32 - new Date(inYear, inMonth, 32).getDate();
			break;
			
			case "Persian":
				if ( inMonth < 6 ) {
					return 31;
				} else if ( inMonth < 11 ) {
					return 30;
				} else {
					return (((((((inYear - ((inYear > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682) ? 30 : 29;
				}
			break;
		}
    }

	/*********************************************
		These Persian converters came from here:
			http://osp.ir/projects/facal/
	*/
	var PERSIAN_EPOCH = 1948320.5;
	var GREGORIAN_EPOCH = 1721425.5;
		
	//  leapPersian  --  Is a given year a leap year in the Persian calendar ?
	function leapPersian(year){
		return ((((((year - ((year > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682;
	}
	
	//  persianToJd  --  Determine Julian day from Persian date
	function persianToJd(year, month, day){
		var epbase, epyear;
	
		epbase = year - ((year >= 0) ? 474 : 473);
		epyear = 474 + (epbase % 2820);
	
		return day +
				((month <= 7) ?
					((month - 1) * 31) :
					(((month - 1) * 30) + 6)
				) +
				Math.floor(((epyear * 682) - 110) / 2816) +
				(epyear - 1) * 365 +
				Math.floor(epbase / 2820) * 1029983 +
				(PERSIAN_EPOCH - 1); 
	}
	
	//  jdToPersian  --  Calculate Persian date from Julian day
	function jdToPersian(jd){
		var year, month, day, depoch, cycle, cyear, ycycle,
			aux1, aux2, yday;
	
		jd = Math.floor(jd) + 0.5;
	
		depoch = jd - persianToJd(475, 1, 1);
		cycle = Math.floor(depoch / 1029983);
		cyear = (depoch % 1029983);
		if (cyear == 1029982) {
			ycycle = 2820;
		} else {
			aux1 = Math.floor(cyear / 366);
			aux2 = (cyear % 366);
			ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) + aux1 + 1;
		}
		year = ycycle + (2820 * cycle) + 474;
		if (year <= 0) {
			year--;
		}
		yday = (jd - persianToJd(year, 1, 1)) + 1;

		month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
		day = (jd - persianToJd(year, month, 1)) + 1;

		return new Array(year, month-1, day);
	}
	
	//  leapGregorian  --  Is a given year in the Gregorian calendar a leap year ?
	function leapGregorian(year){
		return ((year % 4) == 0) &&
				(!(((year % 100) == 0) && ((year % 400) != 0)));
	}
	
	//  gregorianToJd  --  Determine Julian day number from Gregorian calendar date
	function gregorianToJd(year, month, day){
		var yDay = (GREGORIAN_EPOCH - 1) +
			   (365 * (year - 1)) +
			   Math.floor((year - 1) / 4) +
			   (-Math.floor((year - 1) / 100)) +
			   Math.floor((year - 1) / 400) +
			   Math.floor((((367 * month) - 362) / 12) +
			   ((month <= 2) ? 0 : (leapGregorian(year) ? -1 : -2)) + day);
		return yDay;
	}
	
	//  jdToGregorian  --  Calculate Gregorian calendar date from Julian day
	function jdToGregorian(jd) {
		var wjd, depoch, quadricent, dqc, cent, dcent, quad, dquad,
			yindex, dyindex, year, yearday, leapadj;
	
		wjd = Math.floor(jd - 0.5) + 0.5;
		depoch = wjd - GREGORIAN_EPOCH;
		quadricent = Math.floor(depoch / 146097);
		dqc = (depoch % 146097);
		cent = Math.floor(dqc / 36524);
		dcent = (dqc % 36524);
		quad = Math.floor(dcent / 1461);
		dquad = (dcent % 1461);
		yindex = Math.floor(dquad / 365);
		year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
		if (!((cent == 4) || (yindex == 4))) {
			year++;
		}
		yearday = wjd - gregorianToJd(year, 1, 1);
		leapadj = ((wjd < gregorianToJd(year, 3, 1)) ? 0 : (leapGregorian(year) ? 1 : 2)
				  );
		month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
		day = (wjd - gregorianToJd(year, month, 1)) + 1;
	
		return new Array(year, month, day);
	}
	
	function gregorianToSolar(gYear, gMonth, gDay) {
	  var dDate = new Date();
	  if (gDay == 0 && gMonth == 0 && gYear == 0)	{
		gDay = dDate.getDate();
		gMonth = dDate.getMonth();
		gYear = dDate.getFullYear();
	  } else {
		dDate = new Date(gYear, gMonth, gDay);
	  }
	  j = gregorianToJd ( dDate.getFullYear(), dDate.getMonth() + 1, dDate.getDate());
	  return jdToPersian(j);
	}
	
	function solarToGregorian(sYear, sMonth, sDay) {
	
		if (sDay == 0 && sMonth == 0 && sYear == 0) {
				dDate = new Date();
	
				return dDate;
		}
		
		var gregorianDate = jdToGregorian(persianToJd(sYear, sMonth, sDay));
		
		return new Date(gregorianDate[0], gregorianDate[1] - 1, gregorianDate[2]);
	}
		
    /********************
        This function actually constructs the cleantime form. It does this by pure DOM construction, and places
        everything into the container whose ID is passed in by the pContainerId element.

        Parameters:
            initDate    string - This is the initial date and keytag setting.
                        It is a string in the following format:
                            [M]M/[D]D/YYYY-[1|0]
                        The first part is the month (1-12)
                        The second part is the day of the month (1-31)
                        The third part is the year, as a 4-digit number.
                        There is a dash. After that, is either a 1 (Chained) or a 0 (Tabletop).
                        If this parameter is omitted, the default values (today, pChained) will be used.
    */
    function Initialize (initDate) {
        // Start DOM creation section

        // This is an overall wrapper <div>
        var wrapperDiv = document.createElement('div');
        wrapperDiv.id = 'nacc_wrapper';
        wrapperDiv.className = 'nacc_wrapper';

        // Create main <div>- contains title, prompt and form
        var mainDiv = document.createElement('div');
        mainDiv.id = 'nacc_main';

        // adjust class for IE peekaboo bug fix css selector
        if (NACC_browser()&&NACC_browser().indexOf('msie') != -1) {
            mainDiv.className = 'nacc_main nacc_pb_fix';
        }
        else {
            mainDiv.className = 'nacc_main';
        }

        // Create title <span>
        var titleSpan = document.createElement('span');
        titleSpan.id = 'nacc_title';
        titleSpan.className = 'nacc_title';
        titleSpan.innerHTML = gTitle_lang;

        // Add title <span> to main <div>
        mainDiv.appendChild(titleSpan);

        // Create prompt <span> and add it to main <div>
        var promptSpan = document.createElement('span');
        promptSpan.id = 'nacc_prompt';
        promptSpan.className = 'nacc_prompt';
        promptSpan.innerHTML = gPrompt_lang;

        mainDiv.appendChild(promptSpan);

        // Create <form> The controls live within this <form>

        var theForm = document.createElement('form');
        theForm.action = "#";   // Required for valid XHTML.
        theForm.id = 'nacc_form';
        theForm.className = 'nacc_form';

        // Submitting the form calculates cleantime, but does not cause a page to be submitted to server.

        theForm.onsubmit = SubmitForm;

        // Create empty month <select> and add it to <form>. It will be filled later.
        var selectMonth = document.createElement('select');
        selectMonth.id = 'nacc_month_sel';
        selectMonth.className = 'nacc_month_sel';

        theForm.appendChild(selectMonth);

        // Create empty day <select> and add it to <form>. It will be filled later.
        var selectDay = document.createElement('select');
        selectDay.id = 'nacc_day_sel';
        selectDay.className = 'nacc_day_sel';

        theForm.appendChild(selectDay);

        // Create empty year <select> and add it to <form>. It will be filled later.
        var selectYear = document.createElement('select');
        selectYear.id = 'nacc_year_sel';
        selectYear.className = 'nacc_year_sel';

        theForm.appendChild(selectYear);

        // Create the calculate button and add it to <form>
        var calcBtn = document.createElement('input');
        calcBtn.id = 'nacc_calc_btn';
        calcBtn.className = 'nacc_calc_btn';
        calcBtn.type = 'submit';
        calcBtn.value = gCalcBtn_lang;

        theForm.appendChild(calcBtn);

        // Create reset <a> and add it to the <form>
        var resetLink = document.createElement('a');

        resetLink.id = 'nacc_reset_link';
        resetLink.className = 'nacc_reset_link';
        resetLink.href = '#';
        resetLink.title = gResetLinkText_lang[0];
        resetLink.innerHTML = gResetLinkText_lang[1];

        // Clicking link resets everything
        resetLink.onclick = ResetForm;

        theForm.appendChild(resetLink);

        // Create a clearing <div> and add it to the form to clear floated elements
        var clearingDiv = document.createElement('div');
        clearingDiv.className = 'nacc_clearing_div';

        theForm.appendChild(clearingDiv);

        // Add <form> to main <div>
        mainDiv.appendChild(theForm);

        // Add main <div> to wrapper <div>
        wrapperDiv.appendChild(mainDiv);

        // Create results <div>- contains cleantime message and key tag display
        var resultsDiv = document.createElement('div');
        resultsDiv.id = 'nacc_results';
        resultsDiv.className = 'nacc_results';

        // adjust class for IE peekaboo bug fix css selector
        if (NACC_browser()&&NACC_browser().indexOf('msie') != -1) {
            resultsDiv.className = 'nacc_results  nacc_pb_fix';
        }
        else {
            resultsDiv.className = 'nacc_results';
        }

        // Add results <div> to wrapper <div>
        wrapperDiv.appendChild(resultsDiv);

        // Put the whole schmeel into the user-supplied container
        gContainerEl.appendChild(wrapperDiv);

        // End DOM creation section

        // If we have an initial date, it will be in the cookie format, so we parse it out.
        if (initDate) {
            var mycookie = initDate.split('-');
            var parts = mycookie[0].split('/');
            gSelMonth = parts[0];
            gSelDay = parts[1];
            gSelYear = parts[2];

            gChained = parseInt(mycookie[1], 10) == 1;
        }
        else {
			var td_date = new Date();
	
			var dArray = To_Local(td_date.getFullYear(),td_date.getMonth(),td_date.getDate());
			
			gSelYear = dArray[0];
			gSelMonth = dArray[1] + 1;
			gSelDay = dArray[2];
        }

        // Set up the contents of the three date <select> elements.
        FillYearSelect();
        FillMonthSelect();
        FillDaySelect();
    }

    /*****************************************************
        COOKIE FUNCTIONS

        These are simple JavaScript cookie functions. They use the
        cookie name in gCookieName.
    */

    /********************
        Get the cookie value.

        Parameters:
            inCookieName    string - The name of the cookie

        Function Return:
            string - The value of the cookie
    */
    function GetCookie (inCookieName) {
        if ( inCookieName ) {
            var nameEq = inCookieName + '=';
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEq) == 0) {
                    return unescape(c.substring(nameEq.length, c.length));
                }
            }
        }
        return null;
    }

    /********************
        Set a new cookie.

        Parameters:
            inCookieName    string - The name of the cookie
            value          string - The value of the cookie.
    */
    function SetCookie (inCookieName, value) {
        if ( inCookieName ) {
            var nameEq = inCookieName + '=';
            var date = new Date();
            date.setTime(date.getTime() + (gDay * 366));
            var expires = "; expires=" + date.toGMTString();
            document.cookie = nameEq + escape(value) + expires;
        }
    }

    /********************
        Clear the cookie.

        Parameters:
            inCookieName    string - The name of the cookie
    */
    function RemoveCookie (inCookieName) {
        if ( inCookieName ) {
            var nameEq = inCookieName + '=';
            var date = new Date();
            date.setTime(date.getTime() - gDay);
            var expires = "; expires=" + date.toGMTString();
            document.cookie = nameEq + expires;
        }
    }

    /*****************************************************
        CALCULATION FUNCTIONS

        These are the functions where the calculation is actually done.
    */

    /********************
        The Big Kahuna. This calculates the total number of cleandays, the yaers, months and days, etc.
        It returns an associative array of Cleandate numbers ('total_days', 'years', 'months', and 'days')
        Or false if clean date is in the future
    */
    function CalcCleantime () {
		var	cYear = parseInt ( gSelYear );
		var	cMonth = parseInt ( gSelMonth );
		var	cDay = parseInt ( gSelDay );
		var cd_date = To_Gregorian(cYear,cMonth,cDay);
		
		var td_date = new Date();

		// We gotta use round here rather than parseInt or floor because of floating point issues
		var totalDays = parseInt(Math.round((td_date.getTime() / (1000 * 60 * 60 * 24))
									- Math.round(cd_date.getTime()) / (1000 * 60 * 60 * 24)));
        if (totalDays>=0) {
            var years = null;
            var months = null;
            var days = null;

            if (totalDays > 90) {
                var startYear = cd_date.getFullYear();
                var startMonth = cd_date.getMonth();
                var startDay = cd_date.getDate();

				var date_array = To_Local(startYear,startMonth,startDay);
                startYear = date_array[0];
                startMonth = date_array[1];
                startDay = date_array[2];

                var endYear = td_date.getFullYear();
                var endMonth = td_date.getMonth();
                var endDay = td_date.getDate();
                
				date_array = To_Local(endYear,endMonth,endDay);
                endYear = date_array[0];
                endMonth = date_array[1];
                endDay = date_array[2];

                // We first see how many years have passed.
                years = endYear - startYear;
                // We then check months.
                months = (endMonth - startMonth);
                // We do a similar thing with days.
                days = endDay - startDay;


                // If this month is earlier than the cleandate month, we reduce the
                // year by one, and figure out how many months it's been since the
                // last annual anniversary of the clean date.
                if (months < 0) {
                    months = 12 - startMonth;
                    months += endMonth;
                    if (years > 0) years--;
                    }
                
                // We need to figure out how many days it was between the last monthly
                // anniversary and today.
                if (days < 0) {
                    months--;
                    // If we went too far with the months, we go back to the previous year
					if (months < 0) {
						months = 11 - startMonth;
						months += endMonth;
						if (years > 0) years--;
						}

                    days = DaysInMonth(endYear, endMonth) - startDay;
                    days += endDay;
                }
            }

            if (totalDays >= 0) {

                // Return associative array of Cleandate numbers
                var retArray = new Array();
                retArray['total_days'] = totalDays;
                retArray['years'] = years;
                retArray['months'] = months;
                retArray['days'] = days;

                return retArray;
            }
        }
        return false;
    }

    /********************
        This fills the year <select> element.
        1953 is when NA was formed.
    */
    function FillYearSelect () {
        var obj = document.getElementById('nacc_year_sel');

        obj.onchange = null;
        obj.options.length = 0;
        obj.selectedIndex = -1;

        var sel = -1;
        var i = 0;
		
		var start_year = 1953;
		
		var dArray = To_Local(start_year,7,17);
		
		start_year = dArray[0];

		var td_date = new Date();

		dArray = To_Local(td_date.getFullYear(),td_date.getMonth(),td_date.getDate());
		
		var final_year = dArray[0];

        for (var c = start_year; c <= final_year; c++) {
            var opt = document.createElement('option');
            opt.value = c;
            opt.text = c;

            if (gSelYear == c) {
                sel = c - start_year;
            }

            obj.options[i++] = opt;
        }

        if (sel == -1) {
            obj.selectedIndex = obj.options.length - 1;
        }
        else {
            obj.selectedIndex = sel;
        }

       // Make sure that the day <select> element is corrected for leap years.
       obj.onchange = function () { gSelYear = document.getElementById('nacc_year_sel').value;FillDaySelect()};
    }


    /********************
        This fills the month <select> element.
    */
    function FillMonthSelect () {
        var obj = document.getElementById('nacc_month_sel');

        obj.onchange = null;
        obj.options.length = 0;
        obj.selectedIndex = -1;

        var max_month = 12;
        var sel = -1;
        var i = 0;

        for (var c = 1; c <= max_month; c++) {
            var opt = document.createElement('option');

            opt.value = c;
            opt.text = gMonthsFull_lang[c - 1];

            if (gSelMonth == c) {
                sel = c - 1;
            }

            obj.options[i++] = opt;
        }

        if (sel == -1) {
            obj.selectedIndex = obj.options.length - 1;
        }
        else {
            obj.selectedIndex = sel;
        }

        // Make sure that the day <select> element reflects the correct number of days for this month.
       obj.onchange = function () { gSelMonth = document.getElementById('nacc_month_sel').value;FillDaySelect()};
    }

    /********************
        This fills the day <select> element.
    */
    function FillDaySelect () {
        var iSelYear = gSelYear;
        var iSelMonth = gSelMonth;

        if ( document.getElementById('nacc_year_sel').value ) {
            iSelYear = parseInt(document.getElementById('nacc_year_sel').value, 10);
        }
        if ( document.getElementById('nacc_month_sel').value ) {
            iSelMonth = parseInt(document.getElementById('nacc_month_sel').value, 10);
        }
        var obj = document.getElementById('nacc_day_sel');

        obj.onchange = null;
        obj.options.length = 0;
        obj.selectedIndex = -1;

        var max_days = DaysInMonth(iSelYear, iSelMonth - 1);

        var sel = -1;
        var i = 0;

        for (var c = 1; c <= max_days; c++) {
            var opt = document.createElement('option');
            opt.value = c;
            opt.text = c;

            if (gSelDay == c) {
                sel = c - 1;
            }

            obj.options[i++] = opt;
        }

        if (sel == -1) {
            obj.selectedIndex = obj.options.length - 1;
        }
        else {
            obj.selectedIndex = sel;
        }
       // FIX ADDED 8/31/07: The gSelDay was not being set when we changed the last day.
       gSelDay = document.getElementById('nacc_day_sel').value;
       obj.onchange = function () { gSelDay = document.getElementById('nacc_day_sel').value };
    }

    /********************
        When the reset control is activated, we remove the cookie and set the date to today.
        We clear the key tag and message displays.
        We do not change the layout preference.
    */
    function ResetForm () {
        RemoveCookie(gCookieName);

        EmptyObject('nacc_results');

        ResetCleantime();

        FillYearSelect();
        FillMonthSelect();
        FillDaySelect();
        
        return false;
    }

    /********************
        When the form is submitted (either with return key or button click), we clear the message and keytag displays.
        Then we do the calculations, render displays and set cookie.
    */
    function SubmitForm () {
        EmptyObject('nacc_results');

        var result = CalcCleantime();

        // Check if result is not false to determine if it's an array (can't safely check if its an array due to limitations of language)
        if (result !== false) {
            var rTotalDays = result['total_days'];
            var rYears = result['years'];
            var rMonths = result['months'];
            var rDays = result['days'];

			var	msg;
			
			switch ( gCalendarType ) {
				default:
					msg = BuildCleantimeMessageGregorian(rTotalDays, rYears, rMonths, rDays);
				break;
				
				case "Persian":
					msg = BuildCleantimeMessagePersian(rTotalDays, rYears, rMonths, rDays);
				break;
			}
		
            RenderMessage(msg);
            
            RenderKeyTags(BuildKeyTagList(rTotalDays, rYears, rMonths, rDays));

            var mycookie = gSelMonth + '/' + gSelDay + '/' + gSelYear + '-' + (gChained ? '1' : '0');
            SetCookie(gCookieName, mycookie);
        }
        else {
            alert(gFutureWarning_lang);
        }

        return false;
    }

    /********************
        Toggle key tag layout between chained and tabletop and reruns everything
    */
    function ChangeLayout () {
        gChained = (!gChained);

        return SubmitForm();
    }

    /********************
        Simple. Empties DOM object whose id is passed in param.

        Parameters:
            objId string - the id of the DOM object to empty.
    */
    function EmptyObject (objId) {
        if (objId) {
            obj = document.getElementById(objId);
            if (obj) {
                // Add event removal here?!?
                
                obj.innerHTML = '';
            }
        }
    }

    /********************
        Simple. We just set the cleantime to today.
    */
    function ResetCleantime () {
		var td_date = new Date();

		var dArray = To_Local(td_date.getFullYear(),td_date.getMonth(),td_date.getDate());
		
		gSelYear = dArray[0];
		gSelMonth = dArray[1] + 1;
		gSelDay = dArray[2];
    }

    /********************
        This simply writes out the message to the message <div>

        Parameters:
            msg string - The message to be displayed.
    */
    function RenderMessage (msg) {
        var resultsDiv = document.getElementById('nacc_results');

        var msgDiv = document.getElementById('nacc_msg');

        if (!msgDiv) {
            msgDiv = document.createElement('div');
            msgDiv.id = 'nacc_msg';
            msgDiv.className = 'nacc_msg';
            resultsDiv.appendChild(msgDiv);
        }

        msgDiv.innerHTML = msg;
    }

    /********************
        This builds a list of keytags that should be displayed for given cleandate.

        Parameters:
            totalDays   integer - The total number of days between the cleandate and today.
            years      integer - The total number of years between the cleandate and today.
            months    integer - The total number of months between the cleandate's last year anniversary and today
            days        integer - The total number of days between the cleandate's last year/month anniversary and today

        Function Return:
            array of string - The list of tag images, given as src URIs.
    */
    function BuildKeyTagList (totalDays, years, months, days) {
        if (gChained) {
            var fileEnd = '.png';
        }
        else {
            var fileEnd = '_H.png';
        }

        var imageList = new Array();

        imageList[0] = gPathToNACC + 'images/Day_1' + fileEnd;

        if (totalDays >= 30) {
            imageList[1] = gPathToNACC + 'images/Day_30' + fileEnd;
        }

        if (totalDays >= 60) {
            imageList[2] = gPathToNACC + 'images/Day_60' + fileEnd;
        }

        if (totalDays >= 90) {
            imageList[3] = gPathToNACC + 'images/Day_90' + fileEnd;
        }

        if (!years) {
            if (months >= 6) {
                imageList[4] = gPathToNACC + 'images/Month_6' + fileEnd;
            }
            if (months >= 9) {
                imageList[5] = gPathToNACC + 'images/Month_9' + fileEnd;
            }
        }
        else {
            imageList[4] = gPathToNACC + 'images/Month_6' + fileEnd;
            imageList[5] = gPathToNACC + 'images/Month_9' + fileEnd;
            imageList[6] = gPathToNACC + 'images/Month_12' + fileEnd;

            if ((years == 1 && months >= 6) || (years > 1)) {
                imageList[7] = gPathToNACC + 'images/Month_18' + fileEnd;
            }
            
            decades = gUseDecadesTag && (years > 19);
            
            for (var c = 8, year = 2; year <= years; c++, year++) {
                imageList[c] = gPathToNACC + 'images/Month_24' + fileEnd;
                if ( decades && (year > 10) && !(year % 10)) {
                    imageList[c] = gPathToNACC + 'images/Decades' + fileEnd;
                    }
                else {
                    imageList[c] = gPathToNACC + 'images/Month_24' + fileEnd;
                    }
            }
        }

        return imageList;
    }

    /********************
        This takes the calculated list of tags, and creates a bunch of floated <img> elements that correspond to the list.
        This will take the keytag layout preference into account, and will select the correct images accordingly.

        Parameters:
            imageList   array of string - The list of image src names.
    */
    function RenderKeyTags (imageList) {
        if (gHideTags) {
            return;
        }

        if (imageList.length == 0) {
            return;
        }

        var resultsDiv = document.getElementById('nacc_results');


        var keyTagsDiv = document.getElementById('nacc_keytags');

        if (!keyTagsDiv) {
            keyTagsDiv = document.createElement('div');
            keyTagsDiv.id = 'nacc_keytags';
            keyTagsDiv.className = 'nacc_keytags';
            resultsDiv.appendChild(keyTagsDiv);
        }

        var changeLink = document.createElement('a');

        changeLink.id = 'nacc_change_link';
        changeLink.className = 'nacc_change_link';
        changeLink.href = '#';
        changeLink.title = gChangeLinkText_lang[0];
        changeLink.innerHTML = gChangeLinkText_lang[1];
        changeLink.onclick = ChangeLayout;

        keyTagsDiv.appendChild(changeLink);

        var innerDiv = document.createElement('div');

        if (gChained) {
            innerDiv.id = 'nacc_keytags_chained';
            innerDiv.className = 'nacc_keytags_layout_chained';
        }
        else {
            innerDiv.id = 'nacc_keytags_tabletop';
            innerDiv.className = 'nacc_keytags_layout_tabletop';
        }

        keyTagsDiv.appendChild(innerDiv);

        var max = imageList.length;

        if (gOldIE) {
            for (var c = 0; c < max; c++) {
                var imgSpan = document.createElement('span');

                if (gChained) {
                    imgSpan.className = 'nacc_keytag_img_chained';
                }
                else {
                    imgSpan.className = 'nacc_keytag_img_tabletop';
                }

                imgSpan.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src='" + imageList[c] + "');";

                innerDiv.appendChild(imgSpan);
            }
        }
        else {
            for (var c = 0; c < max; c++) {
                var img = document.createElement('img');
                img.alt = 'Key Tag';

                if (gChained) {
                    img.className = 'nacc_keytag_img_chained';
                }
                else {
                    img.className = 'nacc_keytag_img_tabletop';
                }

                img.src = imageList[c];

                innerDiv.appendChild(img);
            }
        }
    }

	/*
		Function to determine browser
	
		Does not determine version except in the case of MSIE
	
		Return values by browser are:
			Opera               opera
			MSIE 7              msie7
			MSIE 6 (and below)  msie
			Safari              safari
			Gecko-based         gecko
			Other               false
	*/
	function NACC_browser () {
		var ua = navigator.userAgent.toLowerCase();
	
		if (ua.indexOf('opera') != -1) { // Opera (check first in case of spoof)
			return 'opera';
		}
		else if (ua.indexOf('msie 7') != -1) { // IE7
			return 'msie7';
		}
		else if (ua.indexOf('msie') != -1) { // IE
			return 'msie';
		}
		else if (ua.indexOf('safari') != -1) { // Safari (check before Gecko because it includes "like Gecko")
			return 'safari';
		}
		else if (ua.indexOf('gecko') != -1) { // Gecko
			return 'gecko';
		}
		else {
			return false;
		}
	}
	
	/*
		We need to add the following code so that IE6 will cache background images.
		By design it will not!!!
		IE5.x and IE7 will, but not IE6.
	
		Though not well documented, apparently it won't work when called in onload().
		So we have to call it inline when this JS file is included.
	
		Documented at http://www.mister-pixel.com/ and other
	*/
	if (NACC_browser() == 'msie') {
		try {
			document.execCommand("BackgroundImageCache", false, true);
		}
		catch (err) {
		}
	}
	
    // The first thing we do when the function is called is to create the <form>. Everything after that is up to the user.
    Initialize(GetCookie(gCookieName));
}
