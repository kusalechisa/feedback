import React, { createContext, useState } from "react";

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("Eng");
  const languageOptions = ["Eng", "Am"];
  const labelLanguage = {
    Eng: [
      "Sector:",
      "Office:",
      "Desk:",
      "Rating:",
      "Phone:",
      "Comment:",
      "Send Feedback",
      "Feedback",
      "Not Good",
      "Average",
      "Good",
      "Very Good",
      "select sector",
      "select office",
      "select desk",
      "Anti-Corruption",
      "Comment Here:",
      "Share us your idea ",
      "Send Complaint",
      "Feedback System ",
      "Feedback",
      "Anti-Corruption",
      "Feedback Admin",
      "Home",
      "If you have any idea.",
      "sector is required!",
      "please choose an office!",
      "please choose desk!",
      "Ministry Of Innovation And Technology",
      "Feedback and Corruption Suggestion System",
      "The Ministry Of Innovation And Technology is one of the 19 ministerial offices re-organize in a new manner by being accountable to the office of the prime minister after duly established as per Article 55 Sub Article 1 of the FDRE Proclamation No. 1097/2018.",
      "Contact Us",
      "Phone:",
      "Location",
      "Addis Ababa, Ethiopia",
      "Go to Main Website",
      "rating is required",
      "Comment is required",
      "Type of Client",
      "Internal",
      "External",
      "Choose one",
      "Service Requested",
      "Main Issue:",
      "Email:",
      "main issue",
      "example@gmail.com",
      "Login",
      "Show password",
      "Admin",
      "Hide password",
      "Forgot password",
      "Issue is required",
      "About",
      "Ministry of Innovation And Technology",
      `     At the Ministry of Innovation and Technology (MINT), we believe in the
          power of your voice to shape our future. Our Feedback and Corruption
          Suggestion System is a key tool designed to:`,
      "1. Improve Service Quality",
      ` After interacting with our services, your feedback helps us
          continuously refine and improve our performance. By sharing your
          experience, you enable us to better serve you and the community.`,
      "2. Ensure Transparency and Integrity",
      `   If you witness any form of corruption or unethical behavior, your
          suggestions and reports are invaluable in promoting accountability
          within MINT. We are committed to maintaining high ethical standards,
          and your input is essential in safeguarding the integrity of our
          operations.`,
      "3. Foster Trust and Collaboration",
      `    By participating in this system, you contribute to a culture of
          openness and trust between MINT and the public. Your feedback and
          suggestions help us work together to build a more transparent and
          efficient organization.`,
      `  Together, we can create a better, more accountable future for
          Ethiopia’s technological advancement. Your voice matters—share your
          feedback and suggestions today!`,
      "System's Developer Team",
    ],
    Am: [
      "ዘርፍ:",
      "ስራ አስፈጻሚ:",
      "ዴስክ:",
      "ደረጃ ይስጡ:",
      "ስልክ ቁጥርህን",
      "አስተያየት ጻፍ",
      "ቅሬታ ላክ",
      "ቅሬታ",
      "ጥሩ አይደለም",
      "መካከለኛ",
      "ጥሩ",
      "በጣም ጥሩ",
      "ዘርፍ ይምረጡ",
      "ቢሮ ይምረጡ",
      "ዴስክ ይምረጡ",
      "የፀረ-ሙስና ቅፅ",
      "ቅሬታህን እዚህ ጻፍ",
      "ቅሬታ ካሎት ሀሳብዎን ያካፍሉን!",
      "ቅሬታ ላክ",
      "የግብረመልስ ስርዓት",
      "ቅሬታ",
      "ፀረ-ሙስና",
      "ቅሬታ አስተዳዳሪ",
      "መነሻ ገጽ",
      "ቅሬታ ካለህ",
      "እባክዎ ዝርፍ ይምረጡ!",
      "እባክዎ ቢሮ ይምረጡ!",
      "እባክዎ ዴስክ ምረጥ!",
      "የኢኖቬሽን እና ቴክኖሎጂ ሚኒስቴር",
      "የቅሬታ እና የሙስና ጥቆማ ስርዓት",
      "በኢፌዴሪ አዋጅ ቁጥር 1097/2018 አንቀጽ 55 ንኡስ አንቀጽ 1 መሰረት ተጠሪነቱ ለጠቅላይ ሚኒስትር ፅህፈት ቤት በአዲስ መልክ ከተደራጁ 19 የሚኒስቴር መስሪያ ቤቶች መካከል የኢኖቬሽንና ቴክኖሎጂ ሚኒስቴር አንዱ ነው።",
      "አግኙን",
      "ስልክ ቁጥር:",
      "አካባቢ",
      "አዲስ አበባ፣ ኢትዮጵያ",
      "ወደ ዋናው ድር ጣቢያ ይሂዱ",
      "እባክዎ ደረጃ ይስጡ!",
      "አስተያየት ባዶ ነው።",
      "የደንበኛ አይነት",
      "የውስጥ",
      "የውጭ",
      "አንዱን ይምረጡ",
      "የአገልግሎት ጥያቄ",
      "ዋና ጉዳይ",
      "የእርስዎ ኢሜይል",
      "ዋና ጉዳይ",
      "example@gmail.com",
      "ግባ",
      "የይለፍ ቃል አሳይ",
      "አስተዳዳሪ",
      "የይለፍ ቃል ደብቅ",
      "የይለፍ ቃል ረሳኽው",
      "ዋናው ጉዳይ ባዶ ነው",
      "ስለ ኩባንያ",
      "የኢኖቬሽን እና ቴክኖሎጂ ሚኒስቴር",
      `በኢኖቬሽን እና ቴክኖሎጂ ሚኒስቴር (MINT) እናምናለን
 የወደፊት ሕይወታችንን ለመቅረጽ የድምፅዎ ኃይል። የእኛ ግብረመልስ እና ሙስና
 የአስተያየት ጥቆማ ስርዓት የሚከተሉትን ለማድረግ የተነደፈ ቁልፍ መሳሪያ ነው፡-`,
      "1. የአገልግሎት ጥራትን ማሻሻል",
      `ከአገልግሎታችን ጋር ከተገናኘን በኋላ፣ የእርስዎ አስተያየት ይረዳናል።
 ያለማቋረጥ ማጣራት እና አፈፃፀማችንን ማሻሻል። ሼር በማድረግ
 ልምድ፣ እርስዎን እና ማህበረሰቡን በተሻለ ሁኔታ እንድናገለግል ያስችሉናል።`,
      "2. ግልጽነትን እና ታማኝነትን ያረጋግጡ",
      `ማንኛውንም ዓይነት ሙስና ወይም ሥነ ምግባር የጎደለው ድርጊት ከተመለከቱ፣ የእርስዎ
 ጥቆማዎች እና ሪፖርቶች ተጠያቂነትን በማስተዋወቅ ረገድ ጠቃሚ ናቸው
 በMINT ውስጥ ከፍተኛ የሥነ ምግባር ደረጃዎችን ለመጠበቅ ቆርጠናል,
 እና የእርስዎ ግብአት የእኛን ታማኝነት ለመጠበቅ አስፈላጊ ነው።
 ስራዎች.`,
      "3. መተማመን እና ትብብርን ያሳድጋል",
      `በዚህ ስርዓት ውስጥ በመሳተፍ ለባህል አስተዋፅዖ ያደርጋሉ
 በMINT እና በህዝብ መካከል ግልጽነት እና መተማመን. የእርስዎ አስተያየት እና
 የጥቆማ አስተያየቶች የበለጠ ግልጽነት ያለው እና ለመገንባት አብረን እንድንሰራ ይረዱናል።
 ውጤታማ ድርጅት.`,
      `በጋራ፣ ለወደፊት የተሻለ፣ የበለጠ ተጠያቂነት መፍጠር እንችላለን
 የኢትዮጵያ የቴክኖሎጂ እድገት። ድምጽዎ አስፈላጊ ነው - ያጋሩ
 አስተያየቶች እና አስተያየቶች ዛሬ!`,
      "የሲስተሙ ደቨሎፐር ቡድን",
    ],
  };

  const updateLanguage = (language) => {
    setSelectedLanguage(language);
  };
  const sectorLabel = {
    Eng: [
      "Minister Office",
      "Innovation & Technology Partnership and Alliance Affairs Office",
      "Inovatation and Reserch Sector",
      "ICT and Digital Economy Sector",
      "Administration Office",
      "Policy & Strategy Studies Research Executive",
      "Innovation Fund Office",
    ],
    Am: [
      "ሚኒስቴር ኃላፊ ጽሕፈት ቤት",
      "የኢኖቬሽንና ቴክኖሎጂ የትብብርና ትስስር ጉዳዮች መሪ ስራ አስፈጻሚ",
      "ኢኖቬሽን ምርምር ዘርፍ",
      "አይሲቲ እና ዲጂታል ኢኮኖሚ ዘርፍ",
      "የሥራ አመራር ዋና ሥራ አስፈጻሚ",
      "የፖሊሲና ስትራቴጂ ጥናትና ምርምር ሥራ አስፈጻሚ",
      "የኢኖቬሽን ፈንድ ጽሕፈት ቤት",
    ],
  };
  const officeLabel = {
    Eng: {
      "Minister Office": [
        "Legal Service Office",
        "Audit Service Office",
        "Institutional Transition Office",
        "Ethics and Anti-Corruption Office",
        "Public relations and Communication Office",
        "Public Relations & Communication Team",
        "Women and Social Affairs Office",
      ],
      "Innovation & Technology Partnership and Alliance Affairs Office": [
        "International Relations & Cooperation Desk",
        "Sector & Regional Councils Desk",
        "Private Sector Industries Technology Desk",
      ],

      "Inovatation and Reserch Sector": [
        "National Research Office",
        "Technology Transformation Office",
        "Technology Innovation and Management Office",
      ],
      "ICT and Digital Economy Sector": [
        "National E-Government Services Office",
        "ICT Infrastructure Development and Management Office",
        "Digital Economy Development Sector Office",
      ],
      "Administration Office": [
        "Strategic Affairs Office",
        "Finance & Procurement Office",
        "Human Resource Competency & Management Office",
        "Information Communication Technology Office",
        "Facilities Management Office",
      ],
      "Policy & Strategy Studies Research Executive": [
        "Policy & Strategy Studies Research Executive",
      ],
      "Innovation Fund Office": ["Innovation Fund Office"],
    },
    Am: {
      "ሚኒስቴር ኃላፊ ጽሕፈት ቤት": [
        "የሕግ አገልግሎት ሥራ አስፈጻሚ",
        "የኦዲት ሥራ አስፈጻሚ",
        "የተቋማዊ ለውጥ ሥራ አስፍጻሚ",
        "የሥነምግባርና ፀረሙስና ሥራ አስፈጻሚ",
        "የህዝብ ግንኙነትና ኮሙኒኬሽን ሥራ አስፈጻሚ",
        "የሴቶችና የማህበራዊ ጉዳዮች አካቶ ትግበራ ሥራ አስፈጻሚ",
      ],
      "የኢኖቬሽንና ቴክኖሎጂ የትብብርና ትስስር ጉዳዮች መሪ ስራ አስፈጻሚ": [
        "የአለም ዓቀፍ ግንኙነትና ትብብር ዴስክ",
        "የዘርፍ ካውንስሎችና የክልሎች ዴስክ",
        "የግል ዘርፍ ኢንዱስትሪዎች ቴክኖሎጂ ዴስክ",
      ],
      "ኢኖቬሽን ምርምር ዘርፍ": [
        "ሀገራዊ የምርምር ልማት መሪ ሥራ አስፈጻሚ",
        "የቴክኖሎጂ ሽግግርና ልማት መሪ ሥራ አስፈጻሚ",
        "የኢኖቬሽን ቴክኖሎጂ መረጃ ልማትና አስተዳደር ዴስክ",
      ],
      "አይሲቲ እና ዲጂታል ኢኮኖሚ ዘርፍ": [
        "የብሄራዊ የኤሌክትሮኒክ መንግስት ልማት መሪ ሥራ አስፈጻሚ",
        "የአይሲቲ መሰረተ ልማት ግንባታ እና አስተዳደር መሪ ሥራ አስፈጻሚ",
        "የዲጂታል ኢኮኖሚ ልማት ዘርፍ መሪ ሥራ አስፈጻሚ",
      ],
      "የሥራ አመራር ዋና ሥራ አስፈጻሚ": [
        "የስትራቴጂክ ጉዳዮች ሥራ አስፈጻሚ",
        "የግዢና ፋይናንስ ሥራ አስፈጻሚ",
        "የብቃትና የሰው ሀይል አስተዳደር ሥራ አስፈጻሚ",
        "የኢንፎርሜሽን ኮሚኒኬሽን ቴክኖሎጂ ሥራ አስፈጻሚ",
        "የመሠረታዊ አገልግሎት ሥራ አስፈጻሚ",
      ],
      "የፖሊሲና ስትራቴጂ ጥናትና ምርምር ሥራ አስፈጻሚ": ["የፖሊሲና ስትራቴጂ ጥናትና ምርምር ሥራ አስፈጻሚ"],
      "የኢኖቬሽን ፈንድ ጽሕፈት ቤት": ["የኢኖቬሽን ፈንድ ጽሕፈት ቤት"],
    },
  };

  const deskLabel = {
    Eng: {
      "Legal Service Office": ["Legal Service Office"],
      "Audit Service Office": ["Audit Service Office"],
      "Institutional Transition Office": ["Institutional Transition Office"],
      "Ethics and Anti-Corruption Office": [
        "Ethics and Anti-Corruption Office",
      ],
      "Public relations and Communication Office": [
        "Public relations and Communication Office",
      ],
      "Public Relations & Communication Team": [
        "Public Relations & Communication Team",
      ],
      "Women and Social Affairs Office": ["Women and Social Affairs Office"],
      "Innovation Fund Office": ["Innovation Fund Office"],

      "International Relations & Cooperation Desk": [
        "International Relations & Cooperation Desk",
      ],
      "Sector & Regional Councils Desk": ["Sector & Regional Councils Desk"],
      "Private Sector Industries Technology Desk": [
        "Private Sector Industries Technology Desk",
      ],

      "Policy & Strategy Studies Research Executive": [
        "Policy & Strategy Studies Research Executive",
      ],

      "National Research Office": [
        "National Research Development Desk",
        "National Research Infrastructure Development Desk",
        "National Research Ethics and Methodology Development Desk",
      ],

      "Technology Transformation Office": [
        "Innovation & Information Technology Development & Management Desk",
        "TechnologIcal Transformation and Collaboration Desk",
        "Indigenous Technology Development Desk",
      ],

      "Technology Innovation and Management Office": [
        "Innovation Development Desk",
        "Innovation Infrastructure Development Desk",
        "Starap & Innovative Enterprise Development Desk 1",
        "Starap & Innovative Enterprise Development Desk 2",
      ],
      "National E-Government Services Office": [
        "National E-Government Services Development & Management Desk",
        "National E-Government Strategy Coordination Desk",
        "National Data Development Coordination Desk",
      ],
      "ICT Infrastructure Development and Management Office": [
        "National Data Center Management Desk",
        "Cyber Security Desk",
        "National ICT Infrastructure Development Desk",
      ],
      "Digital Economy Development Sector Office": [
        "Digital Economy Development Standards & Control Desk",
        "Digital Industry Development Desk",
        "Digital Society Development Desk",
      ],
      "Strategic Affairs Office": [
        "Planning & Budget Preparation, Monitoring & Evaluation Team",
      ],
      "Finance & Procurement Office": ["Procurement Team", "FInance Team"],
      "Human Resource Competency & Management Office": [
        "Human Resource Administration Team ",
        "Human Recourse Competency Development & Management Team",
        "Records Management Team",
      ],
      "Information Communication Technology Office": [
        "Information Communication Technology Office",
      ],
      "Facilities Management Office": [
        "Property Management Team",
        "Property Treasury Team",
        "General Services Team",
        "Transport Deployment Service Team",
      ],
    },
    Am: {
      "የሕግ አገልግሎት ሥራ አስፈጻሚ": ["የህግ አገልግሎት ቢሮ"],
      "የኦዲት ሥራ አስፈጻሚ": ["የኦዲት ሥራ አስፈጻሚ"],
      "የተቋማዊ ለውጥ ሥራ አስፍጻሚ": ["የተቋማዊ ለውጥ ሥራ አስፍጻሚ"],
      "የሥነምግባርና ፀረሙስና ሥራ አስፈጻሚ": ["የሥነ-ምግባር እና ፀረ-ሙስና ጽሕፈት ቤት"],
      "የህዝብ ግንኙነትና ኮሙኒኬሽን ሥራ አስፈጻሚ": ["የህዝብ ግንኙነት እና ኮሙኒኬሽን ቡድን"],
      "የሴቶችና የማህበራዊ ጉዳዮች አካቶ ትግበራ ሥራ አስፈጻሚ": ["የሴቶችና ማህበራዊ ጉዳይ ጽ/ቤት"],
      "የኢኖቬሽን ፈንድ ጽሕፈት ቤት": ["የኢኖቬሽን ፈንድ ቢሮ"],

      "የአለም ዓቀፍ ግንኙነትና ትብብር ዴስክ": ["ዓለም አቀፍ ግንኙነት እና ትብብር ዴስክ"],
      "የዘርፍ ካውንስሎችና የክልሎች ዴስክ": ["የሴክተር እና የክልል ምክር ቤቶች ዴስክ"],
      "የግል ዘርፍ ኢንዱስትሪዎች ቴክኖሎጂ ዴስክ": ["የግል ዘርፍ ኢንዱስትሪዎች ቴክኖሎጂ ዴስክ"],

      "የፖሊሲና ስትራቴጂ ጥናትና ምርምር ሥራ አስፈጻሚ": ["የፖሊሲ እና የስትራቴጂ ጥናቶች ጥናት አስፈፃሚ"],
      ///////
      "ሀገራዊ የምርምር ልማት መሪ ሥራ አስፈጻሚ": [
        "ብሔራዊ የምርምር ልማት ዴስክ",
        "ብሔራዊ የምርምር መሰረተ ልማት ልማት ዴስክ",
        "የአገራዊ የምርምር ስነ-ምግባር እና ዘዴ ልማት ዴስክ",
      ],

      "የቴክኖሎጂ ሽግግርና ልማት መሪ ሥራ አስፈጻሚ": [
        "ኢኖቬሽን እና ኢንፎርሜሽን ቴክኖሎጂ ልማት እና አስተዳደር ዴስክ",
        "ቴክኖሎጂካል ትራንስፎርሜሽን እና የትብብር ዴስክ",
        "የአገር በቀል ቴክኖሎጂ ልማት ዴስክ",
      ],

      "የኢኖቬሽን ቴክኖሎጂ መረጃ ልማትና አስተዳደር ዴስክ": [
        "የፈጠራ ልማት ዴስክ",
        "የኢኖቬሽን መሠረተ ልማት ልማት ዴስክ",
        "ስታራፕ እና ፈጠራ ኢንተርፕራይዝ ልማት ዴስክ 1",
        "ስታራፕ እና ፈጠራ ኢንተርፕራይዝ ልማት ዴስክ 2",
      ],

      "የብሄራዊ የኤሌክትሮኒክ መንግስት ልማት መሪ ሥራ አስፈጻሚ": [
        "ብሔራዊ ኢ-መንግስት አገልግሎቶች ልማት እና አስተዳደር ዴስክ",
        "የብሔራዊ ኢ-መንግስት ስትራቴጂ ማስተባበሪያ ዴስክ",
        "የብሔራዊ መረጃ ልማት ማስተባበሪያ ዴስክ",
      ],
      "የአይሲቲ መሰረተ ልማት ግንባታ እና አስተዳደር መሪ ሥራ አስፈጻሚ": [
        "ብሔራዊ የውሂብ ማዕከል አስተዳደር ዴስክ",
        "የሳይበር ደህንነት ዴስክ",
        "ብሔራዊ የአይሲቲ መሠረተ ልማት ልማት ዴስክ",
      ],

      "የዲጂታል ኢኮኖሚ ልማት ዘርፍ መሪ ሥራ አስፈጻሚ": [
        "ዲጂታል ኢኮኖሚ ልማት ደረጃዎች እና ቁጥጥር ዴስክ",
        "ዲጂታል ኢንዱስትሪ ልማት ዴስክ",
        "የዲጂታል ማህበረሰብ ልማት ዴስክ",
      ],

      "የስትራቴጂክ ጉዳዮች ሥራ አስፈጻሚ": ["የእቅድ እና የበጀት ዝግጅት፣ ክትትል እና ግምገማ ቡድን"],
      "የግዢና ፋይናንስ ሥራ አስፈጻሚ": ["የግዥ ቡድን", "የፋይናንስ ቡድን"],
      "የብቃትና የሰው ሀይል አስተዳደር ሥራ አስፈጻሚ": [
        "የሰው ሀብት አስተዳደር ቡድን",
        "የሰው ጥቅም ብቃት ልማት እና አስተዳደር ቡድን",
        "የመዝገብ አስተዳደር ቡድን",
      ],
      "የኢንፎርሜሽን ኮሚኒኬሽን ቴክኖሎጂ ሥራ አስፈጻሚ": ["የኢንፎርሜሽን ኮሙኒኬሽን ቴክኖሎጂ ቢሮ"],
      "የመሠረታዊ አገልግሎት ሥራ አስፈጻሚ": [
        "የንብረት አስተዳደር ቡድን",
        "የንብረት ግምጃ ቤት ቡድን",
        "አጠቃላይ አገልግሎቶች ቡድን",
        "የትራንስፖርት ማሰማራት አገልግሎት ቡድን",
      ],
    },
  };
  return (
    <LanguageContext.Provider
      value={{
        sectorLabel,
        officeLabel,
        deskLabel,
        selectedLanguage,
        languageOptions,
        labelLanguage,
        updateLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
