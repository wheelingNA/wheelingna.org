<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Verify Mobile</title>

<link rel="icon" href="images/images/flavicon.ico">

<link rel="icon" href="images/images/flavicon.ico">
<meta name="description" content="The Wheeling Area of Narcotics Anonymous is a service area of Narcotics Anonymous, NA, meetings in in Barnesville, Bridgeport, St. Clairsville, Steubenville, and Toronto, Ohio, and in New Martinsville, Payden City, and Wheeling, West Virginia, and is a member of the Tri-State Region of Narcotics Anonymous." />
<meta name="keywords" content="narcotics anonymous, na, steubenville, barnesville, bridgeport, st. clarisville, toronto, ohio, new martinsville, payden city, wheeling, west virginia, na steubenville, na barnesville, na bridgeport, na st. clarisville, na toronto, naohio, na new martinsville, na payden city, na wheeling, na west virginia, steubenville na, barnesville na, bridgeport na, st. clarisville na, toronto na, ohio na, new martinsville na, payden city na, wheeling na, west virginia na, meetings, literature, na literature, wascna, steubenville narcotics anonymous, barnesville narcotics anonymous, bridgeport narcotics anonymous, st. clarisville narcotics anonymous, toronto narcotics anonymous, ohio narcotics anonymous, new martinsville narcotics anonymous, payden city narcotics anonymous, wheeling narcotics anonymous, west virginia narcotics anonymous, na meetings steubenville, na meetings barnesville, na meetings bridgeport, na meetings st. clarisville, na meetings toronto, na meetings ohio, na meetings new martinsville, na meetings payden city, na meetings wheeling, na meetings west virginia, narcotics anonymous meetings, local na meetings, na meetings near me, na meeting list, 12 step, recovery, " />
<meta name="robots" content="index, nofollow" />
<link href="wheelingAreaStyle.css" rel="stylesheet" type="text/css">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>

<body>


<div class="mContainer">

<img src="images/mBanner.jpg" alt="Wheeling Area Service Committee of Narcotics Anonymous Logo, website banner" name="Web Banner Logo, Wheeling Area Service Committee of Narcotics Anonymous" width="100%" id="WASCNA Logo" style="background-color: #8090AB;">
 
<?php

    if (isset( $_POST['Send'] )) { // Check if Submit button is Clicked
    
        // Get data from Form
        // This are descriptions of the variables the script uses
        $Name =stripslashes($_POST['Name']);            // 'Name' is equal to name="Name" in the fuction <input> from the form.
        $Email = stripslashes($_POST['Email']);        // 'Email' is equal to name="Email" in the fuction <input> from the form.
        $Subject = stripslashes($_POST['Subject']);    // 'Subject' is equal to name="Subject" in the fuction <input> from the form.
        $Msg = stripslashes($_POST['Msg']);            // 'Message' is equal to name="Message" in the fuction <input> from the form.
        
        // A sort of spam control to see if every field is filled in
        if ((empty($Name)) || (empty($Email)) || (empty($Subject)) || (empty($Msg))) {
            echo "You must enter in all fields.<br />";
            if (empty($Name)) { // If name is empty
                echo "You must enter your name.<br />";
            }
            if (empty($Email)) { // If email is empty
                echo "You must enter your email.<br />";
            }
            if (empty($Subject)) { // If email is empty
                echo "You must enter your subject.<br />";
            }
            if (empty($Msg)) { // If message is empty
                echo "You must enter your message.<br />";
            }    
            die();
        } 
		
		//Get the values from the $_Post array:
$first_name = trim($_POST['first_name']);
$last_name = trim($_POST['last_name']);
$Msg = trim($_POST['Msg']);

// Create a full name variable:
$name = $first_name . ' ' . $last_name;

//Adjust for HTML tags:
$html_post = htmlentities($_POST['Msg']);
$strip_post = strip_tags($_POST['Msg']);
//Get a word cont:
$words = str_word_count($Msg);

//Take out the bad words:
$Msg = str_ireplace('badword','******', $Msg);
$Msg = str_ireplace('fuck','******', $Msg);

// Print a message:
print "<div style='color:#cccc66;background-color:#006fb5;'>
<h3>Thank you, $Name, for your message, which is $words words long:</h3><br /><br />
<span style='margin-left:80px;font-family:Verdana, Arial, Helvetica, sans-serif; color:#000000'>$strip_post</span><br /><br /><br />
<p>It has been sent to the WASCNA webmaster, and will be forwarded if necessary as appropriate. Further confirmation has been sent to your email address.</p></div>";

//Make a link to another page:
$name = urlencode($name);
$email = urlencode($_POST['email']);
print "<p>Click <a href='mIndex.html'>here </a> to continue.</p>";
		
    
        // Format the message a bit to get the form style
        $Message = "Name: $Name\nEmail: $Email\nMessage: $Msg";
        
        // Put the email adres where the contact form shuld be sent to.
        $ContactEmail = "webmaster@wheelingna.org";
        
        // Send the email to the $ContactEmail
        mail( $ContactEmail, $Subject, $Message, "From: $Email" );
    
        // It will send an email back to the one who sent the message
        // this is the thank you message
        $rMessage = "
            --- Your information ---\n
            Name: $Name\n
            Email: $Email\n
            Message: $Msg\n
            --- Please do not reply ---\n\n
            Thank you for contacting us.
        ";
        mail( $Email, "Re: $Subject", $rMessage, "Reply: $ContactEmail" );
        
        
    }
	
	function IsInjected($str)
{
    $injections = array('(\n+)',
           '(\r+)',
           '(\t+)',
           '(%0A+)',
           '(%0D+)',
           '(%08+)',
           '(%09+)'
           );
                
    $inject = join('|', $injections);
    $inject = "/$inject/i";
     
    if(preg_match($inject,$str))
    {
      return true;
    }
    else
    {
      return false;
    }
}
 
if(IsInjected($visitor_email))
{
    echo "Bad email value!";
    exit;
}
?>

 </div>
  
</div>
</div>
  
 
  <div style class="footer">
    <p align="center">Helpline Phone Number<br />
    <b>(888)251-2426</b></p>
	<p align="center">WASCNA<br />
    P.O. Box 6837<br />
    Wheeling, WV 26003</p>
   
	<p><a href="mContactUs.php">Contact Us</a>.</p>
    <p style="font-size:small; align:center;">&copy;2018 WASCNA</p>
      
    <!-- end .footer --></div>
    </div>
  <!-- end .container --></div>
</body>
</html>
