window.CertificationsContent = {
    getHTML: function () {
        return `
            <div class="section-header">
                <h2>Certifications & Achievements</h2>
                <p>
                    A comprehensive archive of 190+ professional qualifications, digital badges, and academic milestones.
                </p>
            </div>
            <div class="controls">
                <div class="filter-row">
                    <div class="search-container">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" id="cert-search" placeholder="Search by title, ID, or organization...">
                    </div>
                    <div class="filter-container">
                        <select id="cert-filter">
                            <option value="all">All Categories</option>
                            <option value="Data Science">Data Science & AI</option>
                            <option value="Finance">Finance & Business</option>
                            <option value="Development">Development & IT</option>
                            <option value="Healthcare">Healthcare & Safety</option>
                            <option value="Academic">Academic</option>
                            <option value="Professional">Professional Skills</option>
                        </select>
                    </div>
                    <div class="sort-container">
                        <select id="cert-sort">
                            <option value="date-new">Newest First</option>
                            <option value="date-old">Oldest First</option>
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="org">Organization</option>
                        </select>
                    </div>
                    <button id="reset-filters" class="reset-btn">
                        <i class="fas fa-sync-alt"></i> Reset
                    </button>
                </div>
                <div class="results-info">
                    <span id="cert-count">Loading...</span>
                </div>
            </div>
            
            <div id="certificates-grid" class="certificates-grid"></div>

            <div id="certLightbox" class="lightbox">
                <div class="lightbox-content">
                    <span class="close-btn" id="lbClose"><i class="fas fa-times"></i></span>
                    <div class="lightbox-header">
                        <h3 id="lbTitle"></h3>
                        <p class="lb-meta" id="lbMeta"></p>
                    </div>
                    <div class="lightbox-body">
                        <div class="certificate-preview-container">
                            <div id="lbPreviewArea" class="pdf-placeholder">
                                <i class="fas fa-file-pdf fa-4x"></i>
                                <p>PDF Document Available</p>
                                <a href="#" id="lbDirectLink" target="_blank" class="preview-link">Open Full PDF</a>
                            </div>
                        </div>
                        <div class="certificate-details">
                            <div class="detail-row" id="lbCompletion"></div>
                            <div class="detail-row" id="lbCertId"></div>
                            <div class="detail-row" id="lbCredits"></div>
                            <div class="detail-row" id="lbTags"></div>
                            <div class="lb-buttons">
                                <a href="#" id="lbViewPdf" class="lb-button primary-btn" target="_blank">
                                    <i class="fas fa-external-link-alt"></i> View Certificate
                                </a>
                                <button id="shareBtn" class="lb-button secondary-btn">
                                    <i class="fas fa-share-alt"></i> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init: function () {
        // --- FULL DATASET: 194 Certificates Mapped ---
        const certificationsData = [
            // --- 1. Healthcare & Safety ---
            { title: "ACLS Provider", org: "NHCPS", date: "2025-04-02", type: "Healthcare", file: "ACLS_Provider_Card.pdf", tags: ["Medical", "Emergency"] },
            { title: "BLS Provider", org: "NHCPS", date: "2025-04-02", type: "Healthcare", file: "BLS_Provider_Card.pdf", tags: ["CPR", "Life Support"] },
            { title: "PALS Provider", org: "NHCPS", date: "2025-04-03", type: "Healthcare", file: "PALS_Provider_Card.pdf", tags: ["Pediatric", "Emergency"] },
            { title: "CPR, AED & First Aid", org: "NHCPS", date: "2025-03-11", type: "Healthcare", file: "CPR_AED_First_Aid_Card.pdf", tags: ["Safety", "First Aid"] },
            { title: "Bloodborne Pathogens", org: "NHCPS", date: "2025-04-02", type: "Healthcare", file: "Bloodborne_Pathogens_Course.pdf", tags: ["Safety", "Medical"] },
            { title: "SaveaLife ACLS Certification (CME)", org: "Postgraduate Institute for Medicine", date: "2025-04-02", type: "Healthcare", file: "SaveaLife_ACLS_Certification_2025.pdf", tags: ["CME", "Medical"] },
            { title: "SaveaLife BLS Certification (CME)", org: "Postgraduate Institute for Medicine", date: "2025-04-02", type: "Healthcare", file: "SaveaLife_BLS_Certification_2025.pdf", tags: ["CME", "Medical"] },
            { title: "SaveaLife PALS Certification (CME)", org: "Postgraduate Institute for Medicine", date: "2025-04-02", type: "Healthcare", file: "SaveaLife_PALS_Certification_2025.pdf", tags: ["CME", "Medical"] },
            { title: "CPR, AED & First Aid Course (CME)", org: "NHCPS", date: "2025-03-11", type: "Healthcare", file: "CPR_AED_First_Aid_Course.pdf", tags: ["CME", "Safety"] },
            { title: "Cyber Hygiene Training", org: "Asia Foundation", date: "2025-08-17", type: "Healthcare", file: "Cyber_Hygiene_Training_Asia_Foundation.pdf", tags: ["Safety", "Cyber"] },

            // --- 2. Academic ---
            { title: "Higher Secondary Certificate (HSC)", org: "Dhaka Board", date: "2020", type: "Academic", file: "HSC_Certificate_2020.pdf", tags: ["GPA 5.00", "Science"] },
            { title: "Secondary School Certificate (SSC)", org: "Dhaka Board", date: "2018", type: "Academic", file: "SSC_Certificate_2018.pdf", tags: ["GPA 5.00", "Science"] },
            { title: "Junior School Certificate (JSC)", org: "Dhaka Board", date: "2015", type: "Academic", file: "JSC_Certificate_2015.pdf", tags: ["GPA 4.95"] },
            { title: "Primary School Certificate (PSC)", org: "DPE", date: "2012", type: "Academic", file: "PSC_Certificate_2012.pdf", tags: ["GPA 5.00"] },
            { title: "Islamic Science Enrollment", org: "Zad Academy", date: "2026-01-20", type: "Academic", file: "Islamic_Science_Enrollment_Zad.pdf", tags: ["Islamic Studies"] },
            { title: "National Science Fair 2017", org: "Ministry of Science", date: "2017-04-27", type: "Academic", file: "National_Science_Fair_2017_Participation.pdf", tags: ["Science", "Competition"] },

            // --- 3. Government & National Skills ---
            { title: "Web Design (Level 3)", org: "NSDA", date: "2025-07-05", type: "Development", file: "Web_Design_NSDA_Level_3.pdf", tags: ["NSQF", "Freelancing"] },
            { title: "Android App Development", org: "BDSkills / ICT Div", date: "2025-03-04", type: "Development", file: "Android_App_Dev_BDSkills.pdf", tags: ["Mobile", "Java"] },
            { title: "PHP & Laravel Development", org: "BDSkills / ICT Div", date: "2025-03-04", type: "Development", file: "PHP_Laravel_Dev_BDSkills.pdf", tags: ["Web", "Backend"] },
            { title: "Professional Back Office", org: "BDSkills / BACCO", date: "2025-03-04", type: "Professional", file: "Professional_Back_Office_BDSkills.pdf", tags: ["Admin", "Management"] },
            { title: "Customer Service Development", org: "BDSkills / BACCO", date: "2025-03-04", type: "Professional", file: "Customer_Service_Dev_BDSkills.pdf", tags: ["Soft Skills"] },
            { title: "Mobile Game Development", org: "ICT Division", date: "2022-02-27", type: "Development", file: "Mobile_Game_Dev_ICT_Division.pdf", tags: ["Game Dev"] },
            { title: "Hardware & Software Service", org: "ST Institute", date: "2024-01-31", type: "Development", file: "HHP_Mobile_Hardware_Software.pdf", tags: ["Technical", "Repair"] },

            // --- 4. Professional & Miscellaneous ---
            { title: "AI+ Foundation", org: "AI CERTs", date: "2025-06-10", type: "Data Science", file: "AI+ FoundationT.pdf", tags: ["AI", "Foundation"] },
            { title: "EF SET English (C1 Advanced)", org: "EF SET", date: "2025-02-18", type: "Professional", file: "English_Proficiency_EF_SET_C1_Advanced.pdf", tags: ["Language", "English"] },
            { title: "Full Stack MERN", org: "GP Academy", date: "2026-01-21", type: "Development", file: "Full_Stack_MERN_GP_Academy.pdf", tags: ["MERN", "Web"] },
            { title: "2D Animation", org: "GP Academy", date: "2025-11-09", type: "Professional", file: "2D_Animation_GP_Academy.pdf", tags: ["Creative", "Animation"] },
            { title: "AWS Generative AI (Bedrock)", org: "AWS", date: "2024-06-09", type: "Data Science", file: "AWS_Generative_AI_Amazon_Bedrock.pdf", tags: ["Cloud", "AI"] },
            { title: "Cybersecurity Analyst Sim", org: "Tata / Forage", date: "2024-04-24", type: "Professional", file: "Cybersecurity_Analyst_Simulation_Tata.pdf", tags: ["Security"] },
            { title: "Data Visualisation Sim", org: "Tata / Forage", date: "2024-04-24", type: "Data Science", file: "Data_Visualisation_Tata.pdf", tags: ["Viz", "Tata"] },
            { title: "Digital Marketing Strategist", org: "Udemy", date: "2024-04-24", type: "Professional", file: "Digital_Marketing_Strategist_Udemy.pdf", tags: ["Marketing"] },
            { title: "Agile Transformation", org: "Udemy", date: "2024-05-12", type: "Professional", file: "Agile_Transformation_Udemy.pdf", tags: ["Agile", "Management"] },
            { title: "Python Game Dev", org: "Udemy", date: "2024-04-24", type: "Development", file: "Python_Game_Dev_Udemy.pdf", tags: ["Python", "Game"] },
            { title: "Flutter Course", org: "Interactive Cares", date: "2024", type: "Development", file: "Flutter_Course_Interactive_Cares.pdf", tags: ["Mobile", "Flutter"] },
            { title: "UI/UX Design", org: "FutureNation", date: "2025-03-02", type: "Professional", file: "UIUX_Design_FutureNation.pdf", tags: ["Design"] },
            { title: "UI UX Free Course", org: "Interactive Cares", date: "2024", type: "Professional", file: "UI UX Free Course.pdf", tags: ["Design"] },
            { title: "Railbus Membership", org: "Railbus", date: "2026-01-16", type: "Professional", file: "Railbus_Membership_Certificate.pdf", tags: ["Membership"] },
            { title: "Digital Financial Mastery", org: "bKash / 10MS", date: "2025-11-20", type: "Finance", file: "Digital_Financial_Mastery_bKash.pdf", tags: ["Finance"] },
            { title: "SDG Primer", org: "UNDP", date: "2024-09-07", type: "Professional", file: "The_SDG_Primer_UNDP.pdf", tags: ["Social Impact"] },
            { title: "Community Engagement (CHAT)", org: "UNICEF", date: "2025-01-09", type: "Professional", file: "CHAT_Community_Engagement_UNICEF.pdf", tags: ["Social Impact"] },
            { title: "Workplace Communication", org: "UNICEF", date: "2025-10-17", type: "Professional", file: "Workplace_Communication_UNICEF.pdf", tags: ["Soft Skills"] },
            { title: "MICS eLearning", org: "UNICEF", date: "2025-04-03", type: "Professional", file: "UNICEF_MICS_eLearning.pdf", tags: ["Research"] },
            { title: "Innovate2Educate Challenge", org: "Innovate2Educate", date: "2025-09-15", type: "Professional", file: "Innovate2Educate_Handheld_Device_Design_Challenge.pdf", tags: ["Design"] },
            { title: "TATA Crucible Quiz", org: "Tata", date: "2025", type: "Professional", file: "TATA_Crucible_Campus_Quiz_2025.pdf", tags: ["Competition"] },
            { title: "HackerRank CSS Basic", org: "HackerRank", date: "2025-01-10", type: "Development", file: "HackerRank_CSS_Basic_Certificate.pdf", tags: ["CSS"] },
            { title: "JavaScript Crash Course", org: "Interactive Cares", date: "2024", type: "Development", file: "JavaScript_Crash_Course.pdf", tags: ["JS"] },
            { title: "DevOps For Beginners", org: "Interactive Cares", date: "2024", type: "Development", file: "DevOps_For_Beginners.pdf", tags: ["DevOps"] },
            { title: "Step into Web Development", org: "Interactive Cares", date: "2024", type: "Development", file: "Step into the world of Web Development.pdf", tags: ["Web"] },
            { title: "English Skills for Success", org: "Interactive Cares", date: "2024", type: "Professional", file: "English Skills for Academic and Corporate Success.pdf", tags: ["English"] },
            { title: "Python Workshop", org: "ADUST", date: "2023-02-09", type: "Development", file: "Python_3_Programming_Workshop_2023.pdf", tags: ["Python"] },
            { title: "C Programming Workshop", org: "ADUST", date: "2023-06-03", type: "Development", file: "Professional_C_Programming_Workshop_2023.pdf", tags: ["C"] },
            { title: "WordPress Website", org: "Coursera", date: "2024-04-28", type: "Development", file: "WordPress_Website_Coursera.pdf", tags: ["WordPress"] },
            { title: "Microsoft Excel", org: "Coursera", date: "2024-04-28", type: "Professional", file: "Microsoft_Excel_Coursera.pdf", tags: ["Excel"] },
            { title: "A2Z Finance Beginner", org: "Elearnmarkets", date: "2024-04-24", type: "Finance", file: "A2Z_Finance_Beginner_Course.pdf", tags: ["Finance"] },
            { title: "Canva Magic Studio", org: "AI IXX", date: "2025-11-16", type: "Professional", file: "Canva_Magic_Studio_Course.pdf", tags: ["Design"] },
            { title: "ChatGPT Prompt Engineering", org: "Interactive Cares", date: "2025", type: "Data Science", file: "ChatGPT_Prompt_Engineering.pdf", tags: ["AI"] },
            { title: "Microsoft Generative AI", org: "Microsoft", date: "2025-05-28", type: "Data Science", file: "Microsoft_Generative_AI_Concepts.pdf", tags: ["AI"] },
            { title: "National Song Participation", org: "Ministry of Culture", date: "2014", type: "Professional", file: "National song with 1,00,000 people.pdf", tags: ["Culture"] },

            // --- 5. 365 Data Science & Finance (Explicit CC- Files) ---
            { title: "Math Foundation for ML", org: "365 Data Science", date: "2025-11-14", type: "Data Science", file: "CC-055211B341 - Math Foundation for ML.pdf", id: "CC-055211B341", credits: 2 },
            { title: "Intro to NLP for AI", org: "365 Data Science", date: "2025-11-17", type: "Data Science", file: "CC-0AC0C07EE4 - Intro to NLP for AI.pdf", id: "CC-0AC0C07EE4", credits: 4.5 },
            { title: "Data Analysis with Excel Pivot Tables", org: "365 Data Science", date: "2025-11-12", type: "Data Science", file: "CC-0AE0646AB5 - Data Analysis with Excel Pivot Tables.pdf", id: "CC-0AE0646AB5", credits: 2 },
            { title: "Machine Learning with Naive Bayes", org: "365 Data Science", date: "2025-11-10", type: "Data Science", file: "CC-0B2F161B1D - Machine Learning with Naive Bayes.pdf", id: "CC-0B2F161B1D", credits: 2 },
            { title: "Deep Learning with Pytorch", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "CC-0C826BB57C - Deep Learning with Pytorch.pdf", id: "CC-0C826BB57C", credits: 2.5 },
            { title: "A/B Testing in Python", org: "365 Data Science", date: "2025-11-17", type: "Data Science", file: "CC-0F32B005E2 - A-B Testing in Python.pdf", id: "CC-0F32B005E2", credits: 4.5 },
            { title: "The Complete Data Visualization Course", org: "365 Data Science", date: "2025-11-08", type: "Data Science", file: "CC-1513181FE9 - The Complete Data Visualization Course.pdf", id: "CC-1513181FE9", credits: 12.5 },
            { title: "Deep Learning with TensorFlow 2", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "CC-1A5AA7C6B8 - Deep Learning with TensorFlow 2.pdf", id: "CC-1A5AA7C6B8", credits: 11.5 },
            { title: "Intro to Data Engineering", org: "365 Data Science", date: "2025-11-15", type: "Data Science", file: "CC-1A8D732F88 - Intro to Data Engineering.pdf", id: "CC-1A8D732F88", credits: 4.5 },
            { title: "Discounted Cash Flow Valuation", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "CC-1E659916E6 - Discounted Cash Flow Valuation.pdf", id: "CC-1E659916E6", credits: 3 },
            { title: "ML with Decision Trees", org: "365 Data Science", date: "2025-11-17", type: "Data Science", file: "CC-2342975CF0 - Machine Learning with Decision Trees and Random Forests.pdf", id: "CC-2342975CF0", credits: 3 },
            { title: "Working with Text Files in Python", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "CC-2910A5B4BF - Working with Text Files in Python.pdf", id: "CC-2910A5B4BF", credits: 2 },
            { title: "ML with Support Vector Machines", org: "365 Data Science", date: "2025-11-10", type: "Data Science", file: "CC-3407ECBCA7 - Machine Learning with Support Vector Machines.pdf", id: "CC-3407ECBCA7", credits: 2 },
            { title: "The Machine Learning Process A-Z", org: "365 Data Science", date: "2025-11-08", type: "Data Science", file: "CC-38453454B1 - The Machine Learning Process A-Z.pdf", id: "CC-38453454B1", credits: 7.5 },
            { title: "Alternative Investments", org: "365 Finance", date: "2025-11-18", type: "Finance", file: "CC-4344CEF184 - Alternative Investments.pdf", id: "CC-4344CEF184", credits: 2 },
            { title: "Accounting & Financial Analysis", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "CC-45657D66BC - Accounting and Financial Statement Analysis.pdf", id: "CC-45657D66BC", credits: 7.5 },
            { title: "Fundamentals of Financial Markets", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "CC-46226F4B32 - Fundamentals of Financial Markets.pdf", id: "CC-46226F4B32", credits: 9 },
            { title: "Data Cleaning with pandas", org: "365 Data Science", date: "2025-11-12", type: "Data Science", file: "CC-4709D34AEE - Data Cleaning and Preprocessing with pandas.pdf", id: "CC-4709D34AEE", credits: 5 },
            { title: "Build Chat Apps with OpenAI", org: "365 Data Science", date: "2025-11-08", type: "Data Science", file: "CC-56393A85E3 - Build Chat Applications with OpenAI and LangChain.pdf", id: "CC-56393A85E3", credits: 8 },
            { title: "Data Ingestion with Pandas", org: "365 Data Science", date: "2025-11-17", type: "Data Science", file: "CC-564599601C - Data Ingestion with Pandas.pdf", id: "CC-564599601C", credits: 2.5 },
            { title: "FP&A: Building a Budget", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "CC-5680FFA0D1 - FPA - Building a Companys Budget.pdf", id: "CC-5680FFA0D1", credits: 6 },
            { title: "Intro to Microsoft Azure", org: "365 Data Science", date: "2025-11-12", type: "Data Science", file: "CC-598831A7ED - Intro to Microsoft Azure.pdf", id: "CC-598831A7ED", credits: 6.5 },
            { title: "Statistics", org: "365 Data Science", date: "2025-11-11", type: "Data Science", file: "CC-61990B7751 - Statistics.pdf", id: "CC-61990B7751", credits: 9.5 },
            { title: "Introduction to Tableau", org: "365 Data Science", date: "2025-11-08", type: "Data Science", file: "CC-729402C498 - Introduction to Tableau.pdf", id: "CC-729402C498", credits: 3 },
            { title: "Advanced Financial Reporting", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "CC-7487652C37 - Advanced Financial Reporting - Long-term Liabilities.pdf", id: "CC-7487652C37", credits: 2 },
            { title: "Fashion Analytics with Tableau", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "CC-7716A1FAB2 - Fashion Analytics with Tableau.pdf", id: "CC-7716A1FAB2", credits: 4.5 },
            { title: "Portfolio Management", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "CC-9029B2622A - Portfolio Management.pdf", id: "CC-9029B2622A", credits: 12 },
            { title: "Introduction to LLaMA", org: "365 Data Science", date: "2025-11-16", type: "Data Science", file: "CC-9077F082A2 - Introduction to LLaMA.pdf", id: "CC-9077F082A2", credits: 4 },
            { title: "Introduction to Data Architecture", org: "365 Data Science", date: "2025-11-11", type: "Data Science", file: "CC-93925B55CD - Introduction to Data Architecture.pdf", id: "CC-93925B55CD", credits: 5 },
            { title: "Fundamentals of Equity Valuation", org: "365 Finance", date: "2025-11-18", type: "Finance", file: "CC-9454A0015C - Fundamentals of Equity Valuation.pdf", id: "CC-9454A0015C", credits: 3 },
            { title: "Data Pipelines with Apache Airflow", org: "365 Data Science", date: "2025-11-11", type: "Data Science", file: "CC-9611810044 - Building Data Pipelines with Apache Airflow.pdf", id: "CC-9611810044", credits: 3.5 },
            { title: "Corporate Finance", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "CC-9644B7ACDB - Corporate Finance.pdf", id: "CC-9644B7ACDB", credits: 12 },
            { title: "Python 102: Beginners Power-Up", org: "365 Data Science", date: "2025-11-11", type: "Data Science", file: "CC-A179974B43 - Python 102 - Beginners Power-Up.pdf", id: "CC-A179974B43", credits: 2 },
            { title: "AI Applications for Business", org: "365 Data Science", date: "2025-11-15", type: "Data Science", file: "CC-A18CD64E0E - AI Applications for Business Success.pdf", id: "CC-A18CD64E0E", credits: 3.5 },
            { title: "Introduction to Databricks", org: "365 Data Science", date: "2025-11-09", type: "Data Science", file: "CC-A1BC4585CB - Introduction to Databricks.pdf", id: "CC-A1BC4585CB", credits: 2.5 },
            { title: "Advanced SQL for Data Engineering", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "CC-A2284BF286 - Advanced SQL for Data Engineering.pdf", id: "CC-A2284BF286", credits: 3 },
            { title: "Intro to Revenue Analytics", org: "365 Data Science", date: "2025-11-15", type: "Data Science", file: "CC-A3C14C45D9 - Intro to Revenue Analytics.pdf", id: "CC-A3C14C45D9", credits: 1.5 },
            { title: "Growth Analysis with SQL & Tableau", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "CC-A46BC1413F - Growth Analysis with SQL Python and Tableau.pdf", id: "CC-A46BC1413F", credits: 5.5 },
            { title: "Advanced Financial Reporting - Inventory", org: "365 Finance", date: "2025-11-18", type: "Finance", file: "CC-A5392352EB - Advanced Financial Reporting - Inventory.pdf", id: "CC-A5392352EB", credits: 2 },
            { title: "Customer Engagement Analysis", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "CC-A5A6CD5DC6 - Customer Engagement Analysis with SQL and Tableau.pdf", id: "CC-A5A6CD5DC6", credits: 7.5 },
            { title: "Product Management for AI", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "CC-A5FDDE7DCF - Product Management for AI and Data Science.pdf", id: "CC-A5FDDE7DCF", credits: 7.5 },
            { title: "ML with K-Nearest Neighbors", org: "365 Data Science", date: "2025-11-10", type: "Data Science", file: "CC-A73300DB81 - Machine Learning with K-Nearest Neighbors.pdf", id: "CC-A73300DB81", credits: 2 },
            { title: "Introduction to Equity Securities", org: "365 Finance", date: "2025-11-18", type: "Finance", file: "CC-A8FCAD0C06 - Introduction to Equity Securities.pdf", id: "CC-A8FCAD0C06", credits: 1 },
            { title: "Sign-Up Flow Optimization", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "CC-A9557924FA - Sign-Up Flow Optimization Analysis.pdf", id: "CC-A9557924FA", credits: 6.5 },
            { title: "Credit Risk Modeling in Python", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "CC-AA9FA24F97 - Credit Risk Modeling in Python.pdf", id: "CC-AA9FA24F97", credits: 0 },
            { title: "Introduction to Jupyter", org: "365 Data Science", date: "2025-11-10", type: "Data Science", file: "CC-AD0C0DCEAE - Introduction to Jupyter.pdf", id: "CC-AD0C0DCEAE", credits: 1.5 },
            { title: "Introducing Algorithms in Python", org: "365 Data Science", date: "2025-11-12", type: "Data Science", file: "CC-ADB069D3F8 - Introducing Algorithms in Python.pdf", id: "CC-ADB069D3F8", credits: 3 },
            { title: "Intro to AI Agents", org: "365 Data Science", date: "2025-11-09", type: "Data Science", file: "CC-AFDDEB632E - Intro to AI Agents and Agentic AI.pdf", id: "CC-AFDDEB632E", credits: 3 },
            { title: "Communication Skills", org: "365 Data Science", date: "2025-11-18", type: "Professional", file: "CC-AFF684C0EB - Communication and Presentation Skills.pdf", id: "CC-AFF684C0EB", credits: 4.5 },
            { title: "Power BI", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "CC-B062573D07 - Power BI.pdf", id: "CC-B062573D07", credits: 12.5 },

            // --- 6. 365 Data Science & Finance (Files without CC- in filename, mapped to metadata) ---
            { title: "Advanced Microsoft Excel", org: "365 Data Science", date: "2025-11-08", type: "Data Science", file: "Advanced Microsoft Excel.pdf", credits: 4 },
            { title: "Advanced SQL", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "Advanced SQL.pdf", credits: 3 },
            { title: "AI Ethics", org: "365 Data Science", date: "2025-11-16", type: "Data Science", file: "AI Ethics.pdf", credits: 5.5 },
            { title: "AI Model Deployment on AWS", org: "365 Data Science", date: "2025-11-11", type: "Data Science", file: "AI Model deployment on AWS.pdf", credits: 2.5 },
            { title: "Build Conversational AI Memory", org: "365 Data Science", date: "2025-11-09", type: "Data Science", file: "Build Conversational AI Memory with LangGraph.pdf", credits: 2 },
            { title: "Building a 3-Statement Model", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "Building a 3-Statement Model in Excel.pdf", credits: 2.5 },
            { title: "Building Business Reports (Power BI)", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "Building Business Reports Using Power BI.pdf", credits: 2.5 },
            { title: "ChatGPT at Work", org: "365 Data Science", date: "2025-11-11", type: "Data Science", file: "ChatGPT at Work - Ethical and Secure ChatGPT Use.pdf", credits: 4.5 },
            { title: "ChatGPT for Data Science", org: "365 Data Science", date: "2025-11-15", type: "Data Science", file: "ChatGPT for Data Science.pdf", credits: 2.5 },
            { title: "ChatGPT for SQL Beginners", org: "365 Data Science", date: "2025-11-10", type: "Data Science", file: "ChatGPT for SQL Beginners.pdf", credits: 2 },
            { title: "CNNs with TensorFlow", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "Convolutional Neural Networks with TensorFlow in Python.pdf", credits: 6 },
            { title: "Customer Analytics in Python", org: "365 Data Science", date: "2025-11-08", type: "Data Science", file: "Customer Analytics in Python.pdf", credits: 7.5 },
            { title: "Customer Churn Analysis", org: "365 Data Science", date: "2025", type: "Data Science", file: "Customer Churn Analysis with SQL and Tableau.pdf" },
            { title: "Data Analysis in PowerBI with ChatGPT", org: "365 Data Science", date: "2025-11-17", type: "Data Science", file: "Data Analysis in PowerBI with ChatGPT.pdf", credits: 1 },
            { title: "Data Analysis with ChatGPT", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "Data Analysis with ChatGPT.pdf", credits: 2.5 },
            { title: "Data Literacy", org: "365 Data Science", date: "2025-11-11", type: "Data Science", file: "Data Literacy.pdf", credits: 9 },
            { title: "Data Preprocessing with NumPy", org: "365 Data Science", date: "2025-11-09", type: "Data Science", file: "Data Preprocessing with NumPy.pdf", credits: 12.5 },
            { title: "Data Strategy", org: "365 Data Science", date: "2025-11-11", type: "Data Science", file: "Data Strategy.pdf", credits: 9 },
            { title: "Data-Driven Business Growth", org: "365 Data Science", date: "2025-11-17", type: "Data Science", file: "Data-Driven Business Growth.pdf", credits: 4.5 },
            { title: "Dates and Times in Python", org: "365 Data Science", date: "2025-11-15", type: "Data Science", file: "Dates and Times in Python.pdf", credits: 3.5 },
            { title: "Derivatives", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "Derivatives.pdf", credits: 3 },
            { title: "Econometrics I", org: "365 Data Science", date: "2025-11-15", type: "Data Science", file: "Econometrics I.pdf", credits: 2 },
            { title: "Evaluating AI Agents", org: "365 Data Science", date: "2025-11-15", type: "Data Science", file: "Evaluating AI Agents - From Metrics to Real-World Impact.pdf", credits: 3 },
            { title: "Financial Ratio Analysis", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "Financial Ratio Analysis.pdf", credits: 5.5 },
            { title: "Fixed Income Investments", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "Fixed Income Investments.pdf", credits: 5 },
            { title: "Fully Automated MLOps", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "Fully Automated MLOps.pdf", credits: 2.5 },
            { title: "Fundamentals of Financial Reporting", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "Fundamentals of Financial Reporting.pdf", credits: 12.5 },
            { title: "Git and GitHub", org: "365 Data Science", date: "2025-11-13", type: "Development", file: "Git and GitHub.pdf", credits: 1.5 },
            { title: "How to Think Like a Data Scientist", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "How to Think Like a Data Scientist to Become One.pdf", credits: 3.5 },
            { title: "Intermediate Python Programming", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "Intermediate Python Programming.pdf", credits: 1.5 },
            { title: "Intermediate Revenue Analytics", org: "365 Data Science", date: "2025-11-12", type: "Data Science", file: "Intermediate Revenue Analytics.pdf", credits: 3 },
            { title: "Intro to AI", org: "365 Data Science", date: "2025-11-09", type: "Data Science", file: "Intro to AI.pdf", credits: 4 },
            { title: "Intro to ChatGPT & GenAI", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "Intro to ChatGPT and Generative AI.pdf", credits: 3 },
            { title: "Intro to Google Cloud", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "Intro to Google Cloud.pdf", credits: 4.5 },
            { title: "Intro to LLMs", org: "365 Data Science", date: "2025-11-11", type: "Data Science", file: "Intro to LLMs.pdf", credits: 4 },
            { title: "Intro to PowerPoint", org: "365 Finance", date: "2025-11-18", type: "Professional", file: "Intro to PowerPoint.pdf", credits: 1.5 },
            { title: "Intro to Shell", org: "365 Data Science", date: "2025-11-15", type: "Development", file: "Intro to Shell.pdf", credits: 2.5 },
            { title: "Introduction to AWS Cloud", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "Introduction to AWS Cloud.pdf", credits: 4 },
            { title: "Introduction to Business Analytics", org: "365 Data Science", date: "2025-11-12", type: "Data Science", file: "Introduction to Business Analytics.pdf", credits: 7.5 },
            { title: "Introduction to Data Science", org: "365 Data Science", date: "2025-11-09", type: "Data Science", file: "Introduction to Data and Data Science.pdf", credits: 6 },
            { title: "Introduction to Data Warehousing", org: "365 Data Science", date: "2025-11-11", type: "Data Science", file: "Introduction to Data Warehousing.pdf", credits: 4 },
            { title: "Introduction to DAX", org: "365 Data Science", date: "2025-11-15", type: "Data Science", file: "Introduction to DAX.pdf", credits: 4 },
            { title: "Introduction to Excel", org: "365 Data Science", date: "2025-11-11", type: "Data Science", file: "Introduction to Excel.pdf", credits: 7 },
            { title: "Introduction to Hugging Face", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "Introduction to Hugging Face.pdf", credits: 3 },
            { title: "Intro to Industry Analysis", org: "365 Finance", date: "2025-11-18", type: "Finance", file: "Introduction to Industry and Company Analysis.pdf", credits: 3 },
            { title: "Intro to Management Accounting", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "Introduction to Management Accounting.pdf", credits: 6.5 },
            { title: "Introduction to Python", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "Introduction to Python.pdf", credits: 5 },
            { title: "Introduction to R Programming", org: "365 Data Science", date: "2025-11-09", type: "Data Science", file: "Introduction to R Programming.pdf", credits: 8.5 },
            { title: "Intro to Vector Databases", org: "365 Data Science", date: "2025-11-08", type: "Data Science", file: "Introduction to Vector Databases with Pinecone.pdf", credits: 2.5 },
            { title: "Investment Banking", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "Investment Banking.pdf", credits: 6 },
            { title: "LBO Modeling in Excel", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "LBO Modeling in Excel.pdf", credits: 4.5 },
            { title: "Linear Algebra & Feature Selection", org: "365 Data Science", date: "2025-11-16", type: "Data Science", file: "Linear Algebra and Feature Selection.pdf", credits: 5.5 },
            { title: "LLM Engineering with Streamlit", org: "365 Data Science", date: "2025-11-08", type: "Data Science", file: "LLM Engineering in Practice with Streamlit and OpenAI.pdf", credits: 3.5 },
            { title: "ML Deep Dive", org: "365 Data Science", date: "2025-11-08", type: "Data Science", file: "Machine Learning Deep Dive - Business Applications and Coding Walkthroughs.pdf", credits: 4 },
            { title: "Machine Learning in Excel", org: "365 Data Science", date: "2025-11-17", type: "Data Science", file: "Machine Learning in Excel.pdf", credits: 9.5 },
            { title: "Machine Learning in Python", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "Machine Learning in Python.pdf", credits: 11 },
            { title: "ML with Ridge & Lasso", org: "365 Data Science", date: "2025-11-15", type: "Data Science", file: "Machine Learning with Ridge and Lasso Regression.pdf", credits: 2.5 },
            { title: "Macroeconomics", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "Macroeconomics.pdf", credits: 6.5 },
            { title: "Mastering KPIs", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "Mastering Key Performance Indicators (KPIs).pdf", credits: 5.5 },
            { title: "Math for Finance", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "Math for Finance.pdf", credits: 6 },
            { title: "Mathematics", org: "365 Data Science", date: "2025-11-12", type: "Data Science", file: "Mathematics.pdf", credits: 3 },
            { title: "MCPs for Everyone", org: "365 Data Science", date: "2025-11-09", type: "Data Science", file: "MCPs for Everyone - Supercharge Your AI Tooling Skills.pdf", credits: 4 },
            { title: "Multiples Valuation", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "Multiples Valuation.pdf", credits: 2 },
            { title: "Power BI Data Viz Hero", org: "365 Data Science", date: "2025-11-12", type: "Data Science", file: "Power BI Data Visualization Hero.pdf", credits: 3 },
            { title: "Power Query & Data Modeling", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "Power Query and Data Modeling.pdf", credits: 2.5 },
            { title: "Probability", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "Probability.pdf", credits: 9 },
            { title: "Python 101: Kickoff", org: "365 Data Science", date: "2025-11-11", type: "Data Science", file: "Python 101 - Kickoff.pdf", credits: 2 },
            { title: "Python Coding Interview Prep", org: "365 Data Science", date: "2025-11-15", type: "Development", file: "Python Coding Interview Prep.pdf", credits: 1 },
            { title: "Python for Finance", org: "365 Data Science", date: "2025-11-13", type: "Finance", file: "Python for Finance.pdf", credits: 7.5 },
            { title: "Python for Social Media Analytics", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "Python for Social Media Analytics.pdf", credits: 2.5 },
            { title: "Python Programmer Bootcamp", org: "365 Data Science", date: "2025-11-12", type: "Development", file: "Python Programmer Bootcamp.pdf", credits: 16 },
            { title: "Speech Recognition with Python", org: "365 Data Science", date: "2025-11-12", type: "Data Science", file: "Speech Recognition with Python.pdf", credits: 7 },
            { title: "SQL + Tableau", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "SQL + Tableau.pdf", credits: 2 },
            { title: "SQL + Tableau + Python", org: "365 Data Science", date: "2025-11-08", type: "Data Science", file: "SQL and Tableau and Python.pdf", credits: 6.5 },
            { title: "SQL for Data Science Interviews", org: "365 Data Science", date: "2025-11-15", type: "Data Science", file: "SQL for Data Science Interviews.pdf", credits: 5 },
            { title: "SQL", org: "365 Data Science", date: "2025-11-10", type: "Data Science", file: "SQL.pdf", credits: 15 },
            { title: "Starting a Career in Data Science", org: "365 Data Science", date: "2025-11-13", type: "Professional", file: "Starting a Career in Data Science - Project Portfolio Resume and Interview Process.pdf", credits: 7.5 },
            { title: "Statistical Tests in Sales", org: "365 Data Science", date: "2025-11-11", type: "Data Science", file: "Statistical Tests in Sales and Marketing.pdf", credits: 5.5 },
            { title: "Technical Analysis", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "Technical Analysis.pdf", credits: 1.5 },
            { title: "The Machine Learning Algorithms A-Z", org: "365 Data Science", date: "2025-11-08", type: "Data Science", file: "The Machine Learning Algorithms A-Z.pdf", credits: 0.5 },
            { title: "Time Series Analysis with Python", org: "365 Data Science", date: "2025-11-13", type: "Data Science", file: "Time Series Analysis with Python.pdf", credits: 11 },
            { title: "Understanding Cloud Computing", org: "365 Data Science", date: "2025-11-18", type: "Data Science", file: "Understanding Cloud Computing.pdf", credits: 2.5 },
            { title: "Web Scraping & API Fundamentals", org: "365 Data Science", date: "2025-11-13", type: "Development", file: "Web Scraping and API Fundamentals in Python.pdf", credits: 7 },
            { title: "Who Does What in Finance", org: "365 Finance", date: "2025-11-19", type: "Finance", file: "Who Does What in Finance.pdf", credits: 2 }
        ];

        // --- DOM Elements ---
        const grid = document.getElementById("certificates-grid");
        const searchInput = document.getElementById("cert-search");
        const filterSelect = document.getElementById("cert-filter");
        const sortSelect = document.getElementById("cert-sort");
        const countLabel = document.getElementById("cert-count");
        const lightbox = document.getElementById("certLightbox");
        
        // Lightbox Elements
        const lbTitle = document.getElementById("lbTitle");
        const lbMeta = document.getElementById("lbMeta");
        const lbCompletion = document.getElementById("lbCompletion");
        const lbCertId = document.getElementById("lbCertId");
        const lbCredits = document.getElementById("lbCredits");
        const lbTags = document.getElementById("lbTags");
        const lbViewPdf = document.getElementById("lbViewPdf");
        const lbDirectLink = document.getElementById("lbDirectLink");
        const lbClose = document.getElementById("lbClose");

        // --- Rendering Logic ---
        function render(data) {
            grid.innerHTML = "";
            countLabel.textContent = `Showing ${data.length} certificates`;

            if (data.length === 0) {
                grid.innerHTML = `<div class="no-results-message">No certificates found matching your criteria.</div>`;
                return;
            }

            data.forEach(cert => {
                const card = document.createElement("div");
                card.className = "cert-card";
                
                // Determine Icon based on type
                let icon = "fa-certificate";
                if (cert.type === "Data Science") icon = "fa-database";
                if (cert.type === "Finance") icon = "fa-chart-line";
                if (cert.type === "Healthcare") icon = "fa-heartbeat";
                if (cert.type === "Academic") icon = "fa-graduation-cap";
                if (cert.type === "Development") icon = "fa-code";
                if (cert.type === "Professional") icon = "fa-briefcase";

                card.innerHTML = `
                    <div class="cert-icon-wrapper">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="cert-info">
                        <h4>${cert.title}</h4>
                        <p class="org">${cert.org}</p>
                        <p class="date"><i class="far fa-calendar-alt"></i> ${cert.date}</p>
                        <span class="badge">${cert.type}</span>
                    </div>
                    <div class="cert-actions">
                        <button class="view-btn">View Certificate</button>
                    </div>
                `;

                card.querySelector(".view-btn").addEventListener("click", () => openLightbox(cert));
                grid.appendChild(card);
                
                // Trigger animation
                setTimeout(() => card.classList.add("animate"), 50);
            });
        }

        // --- Lightbox Logic ---
        function openLightbox(cert) {
            lbTitle.textContent = cert.title;
            lbMeta.textContent = `${cert.org} | ${cert.type}`;
            
            // Details
            lbCompletion.innerHTML = `<strong>Completed:</strong> ${cert.date}`;
            lbCertId.innerHTML = cert.id ? `<strong>ID:</strong> ${cert.id}` : '';
            lbCredits.innerHTML = cert.credits ? `<strong>Credits:</strong> ${cert.credits}` : '';
            lbTags.innerHTML = cert.tags ? `<strong>Tags:</strong> ${cert.tags.map(t => `<span class="tag">${t}</span>`).join(" ")}` : '';
            
            // PDF Handling
            const pdfPath = `files/Certificates/${cert.file}`;
            lbViewPdf.href = pdfPath;
            lbDirectLink.href = pdfPath;

            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        }

        function closeLightbox() {
            lightbox.classList.remove("active");
            document.body.style.overflow = "auto";
        }

        // --- Event Listeners ---
        lbClose.addEventListener("click", closeLightbox);
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Filter & Search Logic
        function filterData() {
            const term = searchInput.value.toLowerCase();
            const type = filterSelect.value;
            const sort = sortSelect.value;

            let filtered = certificationsData.filter(item => {
                const matchesSearch = item.title.toLowerCase().includes(term) || 
                                      item.org.toLowerCase().includes(term) ||
                                      (item.id && item.id.toLowerCase().includes(term));
                const matchesType = type === "all" || item.type === type;
                return matchesSearch && matchesType;
            });

            // Sorting
            filtered.sort((a, b) => {
                if (sort === "date-new") return new Date(b.date) - new Date(a.date);
                if (sort === "date-old") return new Date(a.date) - new Date(b.date);
                if (sort === "name-asc") return a.title.localeCompare(b.title);
                if (sort === "org") return a.org.localeCompare(b.org);
            });

            render(filtered);
        }

        searchInput.addEventListener("input", filterData);
        filterSelect.addEventListener("change", filterData);
        sortSelect.addEventListener("change", filterData);
        
        document.getElementById("reset-filters").addEventListener("click", () => {
            searchInput.value = "";
            filterSelect.value = "all";
            sortSelect.value = "date-new";
            filterData();
        });

        // Initial Render
        filterData();
    }
};