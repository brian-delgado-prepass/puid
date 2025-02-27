import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  ArrowRight,
  ChevronRight,
  Copy,
  Check,
  RefreshCw,
  User,
  Brain,
  Heart,
  Briefcase,
  Award
} from 'lucide-react';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define types
type Step = 'basics' | 'personality' | 'preferences' | 'experiences' | 'values' | 'review';

type BasicsInfo = {
  firstName: string;
  lastName: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  gender: string;
};

type PersonalityInfo = {
  personalityType: string;
  traits: string[];
  strengths: string[];
  challenges: string[];
};

type PreferencesInfo = {
  favoriteColor: string;
  musicGenres: string[];
  favoriteHobby: string;
};

type ExperiencesInfo = {
  education: string;
  profession: string;
  languages: string[];
};

type ValuesInfo = {
  coreValues: string[];
  causes: string[];
  lifeGoal: string;
};

function App() {
  // State for current step
  const [currentStep, setCurrentStep] = useState<Step>('basics');
  
  // State for form data
  const [basicsInfo, setBasicsInfo] = useState<BasicsInfo>({
    firstName: '',
    lastName: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    gender: '',
  });
  
  const [personalityInfo, setPersonalityInfo] = useState<PersonalityInfo>({
    personalityType: '',
    traits: [],
    strengths: [],
    challenges: [],
  });
  
  const [preferencesInfo, setPreferencesInfo] = useState<PreferencesInfo>({
    favoriteColor: '',
    musicGenres: [],
    favoriteHobby: '',
  });
  
  const [experiencesInfo, setExperiencesInfo] = useState<ExperiencesInfo>({
    education: '',
    profession: '',
    languages: [],
  });
  
  const [valuesInfo, setValuesInfo] = useState<ValuesInfo>({
    coreValues: [],
    causes: [],
    lifeGoal: '',
  });
  
  // State for PUID
  const [puid, setPuid] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  // Options for select fields
  const months = [
    '01', '02', '03', '04', '05', '06', 
    '07', '08', '09', '10', '11', '12'
  ];
  
  const days = Array.from({ length: 31 }, (_, i) => 
    (i + 1).toString().padStart(2, '0')
  );
  
  const years = Array.from({ length: 100 }, (_, i) => 
    (new Date().getFullYear() - i).toString()
  );
  
  const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  
  const personalityTypes = ['Analytical', 'Creative', 'Diplomatic', 'Practical'];
  
  const traits = [
    'Ambitious', 'Calm', 'Curious', 'Determined', 'Empathetic',
    'Intuitive', 'Logical', 'Optimistic', 'Reliable', 'Thoughtful'
  ];
  
  const strengths = [
    'Adaptability', 'Communication', 'Creativity', 'Critical thinking',
    'Leadership', 'Problem solving', 'Teamwork', 'Technical skills'
  ];
  
  const challenges = [
    'Decision making', 'Delegation', 'Meeting deadlines', 'Public speaking',
    'Work-life balance', 'Handling criticism', 'Networking', 'Patience'
  ];
  
  const musicGenres = [
    'Classical', 'Country', 'Electronic', 'Hip-hop', 'Jazz',
    'Pop', 'R&B', 'Rock', 'Folk', 'Metal'
  ];
  
  const educationLevels = [
    'High School', 'Some College', 'Associate\'s Degree',
    'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate',
    'Trade School', 'Self-taught'
  ];
  
  const languages = [
    'English', 'Spanish', 'French', 'German', 'Chinese',
    'Japanese', 'Arabic', 'Russian', 'Portuguese', 'Hindi'
  ];
  
  const values = [
    'Authenticity', 'Balance', 'Compassion', 'Creativity', 'Excellence',
    'Freedom', 'Growth', 'Happiness', 'Health', 'Honesty',
    'Innovation', 'Justice', 'Knowledge', 'Leadership', 'Loyalty',
    'Passion', 'Respect', 'Security', 'Spirituality', 'Wisdom'
  ];
  
  const causes = [
    'Animal welfare', 'Arts & culture', 'Children & youth', 'Civil rights',
    'Climate change', 'Education', 'Environmental protection', 'Healthcare',
    'Homelessness', 'Human rights', 'Mental health', 'Poverty reduction'
  ];
  
  // Navigation functions
  const nextStep = () => {
    switch (currentStep) {
      case 'basics':
        setCurrentStep('personality');
        break;
      case 'personality':
        setCurrentStep('preferences');
        break;
      case 'preferences':
        setCurrentStep('experiences');
        break;
      case 'experiences':
        setCurrentStep('values');
        break;
      case 'values':
        generatePUID();
        setCurrentStep('review');
        break;
    }
  };
  
  const prevStep = () => {
    switch (currentStep) {
      case 'personality':
        setCurrentStep('basics');
        break;
      case 'preferences':
        setCurrentStep('personality');
        break;
      case 'experiences':
        setCurrentStep('preferences');
        break;
      case 'values':
        setCurrentStep('experiences');
        break;
      case 'review':
        setCurrentStep('values');
        break;
    }
  };
  
  // Check if current step is complete
  const isStepComplete = () => {
    switch (currentStep) {
      case 'basics':
        return (
          basicsInfo.firstName.trim() !== '' &&
          basicsInfo.lastName.trim() !== '' &&
          basicsInfo.birthMonth !== '' &&
          basicsInfo.birthDay !== '' &&
          basicsInfo.birthYear !== '' &&
          basicsInfo.gender !== ''
        );
      case 'personality':
        return (
          personalityInfo.personalityType !== '' &&
          personalityInfo.traits.length > 0 &&
          personalityInfo.strengths.length > 0 &&
          personalityInfo.challenges.length > 0
        );
      case 'preferences':
        return (
          preferencesInfo.favoriteColor.trim() !== '' &&
          preferencesInfo.musicGenres.length > 0 &&
          preferencesInfo.favoriteHobby.trim() !== ''
        );
      case 'experiences':
        return (
          experiencesInfo.education !== '' &&
          experiencesInfo.profession.trim() !== '' &&
          experiencesInfo.languages.length > 0
        );
      case 'values':
        return (
          valuesInfo.coreValues.length > 0 &&
          valuesInfo.lifeGoal.trim() !== ''
        );
      default:
        return false;
    }
  };
  
  // Form change handlers
  const handleBasicsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBasicsInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePersonalityTypeChange = (type: string) => {
    setPersonalityInfo(prev => ({ ...prev, personalityType: type }));
  };
  
  const handleTraitToggle = (trait: string) => {
    setPersonalityInfo(prev => {
      if (prev.traits.includes(trait)) {
        return { ...prev, traits: prev.traits.filter(t => t !== trait) };
      } else {
        return { ...prev, traits: [...prev.traits, trait] };
      }
    });
  };
  
  const handleStrengthToggle = (strength: string) => {
    setPersonalityInfo(prev => {
      if (prev.strengths.includes(strength)) {
        return { ...prev, strengths: prev.strengths.filter(s => s !== strength) };
      } else {
        return { ...prev, strengths: [...prev.strengths, strength] };
      }
    });
  };
  
  const handleChallengeToggle = (challenge: string) => {
    setPersonalityInfo(prev => {
      if (prev.challenges.includes(challenge)) {
        return { ...prev, challenges: prev.challenges.filter(c => c !== challenge) };
      } else {
        return { ...prev, challenges: [...prev.challenges, challenge] };
      }
    });
  };
  
  const handlePreferencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreferencesInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleMusicGenreToggle = (genre: string) => {
    setPreferencesInfo(prev => {
      if (prev.musicGenres.includes(genre)) {
        return { ...prev, musicGenres: prev.musicGenres.filter(g => g !== genre) };
      } else {
        return { ...prev, musicGenres: [...prev.musicGenres, genre] };
      }
    });
  };
  
  const handleExperiencesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExperiencesInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLanguageToggle = (language: string) => {
    setExperiencesInfo(prev => {
      if (prev.languages.includes(language)) {
        return { ...prev, languages: prev.languages.filter(l => l !== language) };
      } else {
        return { ...prev, languages: [...prev.languages, language] };
      }
    });
  };
  
  const handleValueToggle = (value: string) => {
    setValuesInfo(prev => {
      if (prev.coreValues.includes(value)) {
        return { ...prev, coreValues: prev.coreValues.filter(v => v !== value) };
      } else {
        return { ...prev, coreValues: [...prev.coreValues, value] };
      }
    });
  };
  
  const handleCauseToggle = (cause: string) => {
    setValuesInfo(prev => {
      if (prev.causes.includes(cause)) {
        return { ...prev, causes: prev.causes.filter(c => c !== cause) };
      } else {
        return { ...prev, causes: [...prev.causes, cause] };
      }
    });
  };
  
  const handleValuesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValuesInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // Generate phonetic PUID
  const generatePUID = async () => {
    try {
      // Reset any previous errors
      setSaveError(null);
      
      // Create a seed from user data
      const seed = `${basicsInfo.firstName}-${basicsInfo.lastName}-${basicsInfo.birthYear}-${personalityInfo.personalityType}-${preferencesInfo.favoriteColor}-${experiencesInfo.profession}-${valuesInfo.coreValues.join('')}`;
      
      // Generate phonetic PUID
      const consonants = 'bcdfghjklmnpqrstvwxyz';
      const vowels = 'aeiou';
      let result = '';
      
      // Create a deterministic but seemingly random pattern based on the seed
      let seedSum = 0;
      for (let i = 0; i < seed.length; i++) {
        seedSum += seed.charCodeAt(i);
      }
      
      // Generate a phonetic ID with alternating consonants and vowels
      for (let i = 0; i < 12; i++) {
        const charSet = i % 2 === 0 ? consonants : vowels;
        const charIndex = (seedSum + i * 7) % charSet.length;
        result += charSet[charIndex];
      }
      
      // Format as XXX-XXX-XXX-XXX for readability
      const formattedResult = `${result.slice(0, 3)}-${result.slice(3, 6)}-${result.slice(6, 9)}-${result.slice(9, 12)}`;
      
      // Save to Supabase if available
      try {
        const { error } = await supabase.from('personal_identities').insert([
          {
            puid: formattedResult,
            first_name: basicsInfo.firstName,
            last_name: basicsInfo.lastName,
            birth_year: basicsInfo.birthYear,
            personality_type: personalityInfo.personalityType,
            favorite_color: preferencesInfo.favoriteColor,
            profession: experiencesInfo.profession,
            core_values: valuesInfo.coreValues
          }
        ]);
        
        if (error) {
          console.error("Failed to save to Supabase:", error);
          setSaveError(`Failed to save: ${error.message}`);
        }
      } catch (error) {
        // Continue even if Supabase save fails
        console.error("Failed to save to Supabase:", error);
        if (error instanceof Error) {
          setSaveError(`Failed to save: ${error.message}`);
        } else {
          setSaveError("Failed to save to database");
        }
      }
      
      setPuid(formattedResult);
    } catch (error) {
      console.error("Error generating PUID:", error);
      setPuid("Error generating PUID");
      if (error instanceof Error) {
        setSaveError(`Error: ${error.message}`);
      } else {
        setSaveError("An unknown error occurred");
      }
    }
  };
  
  // Copy PUID to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(puid).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Progress calculation
  const calculateProgress = () => {
    const steps = ['basics', 'personality', 'preferences', 'experiences', 'values', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex) / (steps.length - 1)) * 100;
  };
  
  // Render progress bar
  const renderProgressBar = () => {
    const progress = calculateProgress();
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };
  
  // Render step indicators
  const renderStepIndicators = () => {
    const steps = [
      { id: 'basics', label: 'Basics', icon: <User className="h-5 w-5" /> },
      { id: 'personality', label: 'Personality', icon: <Brain className="h-5 w-5" /> },
      { id: 'preferences', label: 'Preferences', icon: <Heart className="h-5 w-5" /> },
      { id: 'experiences', label: 'Experiences', icon: <Briefcase className="h-5 w-5" /> },
      { id: 'values', label: 'Values', icon: <Award className="h-5 w-5" /> },
    ];
    
    return (
      <div className="flex justify-between mb-8 px-2">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`flex flex-col items-center ${
              currentStep === step.id ? 'text-indigo-600' : 
              steps.indexOf(step as any) < steps.findIndex(s => s.id === currentStep) ? 'text-indigo-400' : 'text-gray-400'
            }`}
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
              currentStep === step.id ? 'bg-indigo-100 text-indigo-600 border-2 border-indigo-600' : 
              steps.indexOf(step as any) < steps.findIndex(s => s.id === currentStep) ? 'bg-indigo-100 text-indigo-400' : 'bg-gray-100'
            }`}>
              {step.icon}
            </div>
            <span className="text-xs hidden md:block">{step.label}</span>
          </div>
        ))}
      </div>
    );
  };
  
  // Render form components
  const renderBasicsForm = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={basicsInfo.firstName}
              onChange={handleBasicsChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={basicsInfo.lastName}
              onChange={handleBasicsChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <select
                  name="birthMonth"
                  value={basicsInfo.birthMonth}
                  onChange={handleBasicsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Month</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  name="birthDay"
                  value={basicsInfo.birthDay}
                  onChange={handleBasicsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  name="birthYear"
                  value={basicsInfo.birthYear}
                  onChange={handleBasicsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={basicsInfo.gender}
              onChange={handleBasicsChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select gender</option>
              {genders.map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  };
  
  const renderPersonalityForm = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personality Profile</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personality Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {personalityTypes.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => handlePersonalityTypeChange(type)}
                className={`py-2 px-4 rounded-md border ${
                  personalityInfo.personalityType === type
                    ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personal Traits (Select at least 3)
          </label>
          <div className="flex flex-wrap gap-2">
            {traits.map(trait => (
              <button
                key={trait}
                type="button"
                onClick={() => handleTraitToggle(trait)}
                className={`py-1 px-3 rounded-full text-sm ${
                  personalityInfo.traits.includes(trait)
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {trait}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Strengths (Select at least 2)
          </label>
          <div className="flex flex-wrap gap-2">
            {strengths.map(strength => (
              <button
                key={strength}
                type="button"
                onClick={() => handleStrengthToggle(strength)}
                className={`py-1 px-3 rounded-full text-sm ${
                  personalityInfo.strengths.includes(strength)
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {strength}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personal Challenges (Select at least 2)
          </label>
          <div className="flex flex-wrap gap-2">
            {challenges.map(challenge => (
              <button
                key={challenge}
                type="button"
                onClick={() => handleChallengeToggle(challenge)}
                className={`py-1 px-3 rounded-full text-sm ${
                  personalityInfo.challenges.includes(challenge)
                    ? 'bg-amber-100 text-amber-700 border border-amber-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {challenge}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderPreferencesForm = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Preferences</h2>
        
        <div className="mb-6">
          <label htmlFor="favoriteColor" className="block text-sm font-medium text-gray-700 mb-1">
            Favorite Color
          </label>
          <input
            type="text"
            id="favoriteColor"
            name="favoriteColor"
            value={preferencesInfo.favoriteColor}
            onChange={handlePreferencesChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Music Genres You Enjoy (Select at least 1)
          </label>
          <div className="flex flex-wrap gap-2">
            {musicGenres.map(genre => (
              <button
                key={genre}
                type="button"
                onClick={() => handleMusicGenreToggle(genre)}
                className={`py-1 px-3 rounded-full text-sm ${
                  preferencesInfo.musicGenres.includes(genre)
                    ? 'bg-purple-100 text-purple-700 border border-purple-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="favoriteHobby" className="block text-sm font-medium text-gray-700 mb-1">
            Favorite Hobby or Activity
          </label>
          <input
            type="text"
            id="favoriteHobby"
            name="favoriteHobby"
            value={preferencesInfo.favoriteHobby}
            onChange={handlePreferencesChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </div>
    );
  };
  
  const renderExperiencesForm = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Life Experiences</h2>
        
        <div className="mb-6">
          <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
            Highest Level of Education
          </label>
          <select
            id="education"
            name="education"
            value={experiencesInfo.education}
            onChange={handleExperiencesChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select education level</option>
            {educationLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
            Current Profession or Field
          </label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={experiencesInfo.profession}
            onChange={handleExperiencesChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Languages You Speak (Select at least 1)
          </label>
          <div className="flex flex-wrap gap-2">
            {languages.map(language => (
              <button
                key={language}
                type="button"
                onClick={() => handleLanguageToggle(language)}
                className={`py-1 px-3 rounded-full text-sm ${
                  experiencesInfo.languages.includes(language)
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderValuesForm = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Values</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Core Values (Select at least 3)
          </label>
          <div className="flex flex-wrap gap-2">
            {values.map(value => (
              <button
                key={value}
                type="button"
                onClick={() => handleValueToggle(value)}
                className={`py-1 px-3 rounded-full text-sm ${
                  valuesInfo.coreValues.includes(value)
                    ? 'bg-teal-100 text-teal-700 border border-teal-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Causes You Care About (Optional)
          </label>
          <div className="flex flex-wrap gap-2">
            {causes.map(cause => (
              <button
                key={cause}
                type="button"
                onClick={() => handleCauseToggle(cause)}
                className={`py-1 px-3 rounded-full text-sm ${
                  valuesInfo.causes.includes(cause)
                    ? 'bg-rose-100 text-rose-700 border border-rose-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {cause}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="lifeGoal" className="block text-sm font-medium text-gray-700 mb-1">
            What is your primary life goal or purpose?
          </label>
          <textarea
            id="lifeGoal"
            name="lifeGoal"
            value={valuesInfo.lifeGoal}
            onChange={handleValuesChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          ></textarea>
        </div>
      </div>
    );
  };
  
  const renderReviewPage = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Personal Identifier</h2>
        
        <div className="bg-indigo-50 p-6 rounded-lg mb-8">
          <p className="text-sm text-indigo-600 mb-2">Your unique phonetic PUID</p>
          <div className="flex items-center">
            <p 
              data-testid="puid"
              className="text-3xl font-mono font-bold text-indigo-700 tracking-wider mr-3"
            >
              {puid}
            </p>
            <button
              onClick={copyToClipboard}
              className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>
          <button
            onClick={generatePUID}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 mt-2"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Regenerate
          </button>
          
          {saveError && (
            <p className="text-sm text-red-600 mt-2">
              Note: {saveError}
            </p>
          )}
        </div>
        
        <div className="space-y-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{basicsInfo.firstName} {basicsInfo.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{basicsInfo.birthMonth}/{basicsInfo.birthDay}/{basicsInfo.birthYear}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{basicsInfo.gender}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Personality</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{personalityInfo.personalityType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Traits</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {personalityInfo.traits.map(trait => (
                    <span 
                      key={trait} 
                      className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Strengths</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {personalityInfo.strengths.map(strength => (
                    <span 
                      key={strength} 
                      className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Challenges</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {personalityInfo.challenges.map(challenge => (
                    <span 
                      key={challenge} 
                      className="bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-sm"
                    >
                      {challenge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Preferences</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Favorite Color</p>
                <p className="font-medium">{preferencesInfo.favoriteColor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Music Genres</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {preferencesInfo.musicGenres.map(genre => (
                    <span 
                      key={genre} 
                      className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Favorite Hobby</p>
                <p className="font-medium">{preferencesInfo.favoriteHobby}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Experiences</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Education</p>
                <p className="font-medium">{experiencesInfo.education}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Profession</p>
                <p className="font-medium">{experiencesInfo.profession}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Languages</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {experiencesInfo.languages.map(language => (
                    <span 
                      key={language} 
                      className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Values</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Core Values</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {valuesInfo.coreValues.map(value => (
                    <span 
                      key={value} 
                      className="bg-teal-50 text-teal-700 px-2 py-1 rounded-md text-sm"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
              {valuesInfo.causes.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500">Causes</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {valuesInfo.causes.map(cause => (
                      <span 
                        key={cause} 
                        className="bg-rose-50 text-rose-700 px-2 py-1 rounded-md text-sm"
                      >
                        {cause}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Life Goal</p>
                <p className="font-medium">{valuesInfo.lifeGoal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 'basics':
        return renderBasicsForm();
      case 'personality':
        return renderPersonalityForm();
      case 'preferences':
        return renderPreferencesForm();
      case 'experiences':
        return renderExperiencesForm();
      case 'values':
        return renderValuesForm();
      case 'review':
        return renderReviewPage();
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Personal Identity Creator</h1>
          <p className="text-gray-600 mt-2">
            Create your unique personal identifier based on who you are
          </p>
        </div>
        
        {renderProgressBar()}
        {renderStepIndicators()}
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {renderStep()}
          
          {currentStep !== 'review' && (
            <div className="mt-8 flex justify-between">
              {currentStep !== 'basics' ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ChevronRight className="h-5 w-5 mr-1 transform rotate-180" />
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepComplete()}
                className={`flex items-center px-4 py-2 rounded-md ${
                  isStepComplete()
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRight className="h-5 w-5 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;