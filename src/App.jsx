import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, TrendingUp, Calendar, MessageSquare, Award, Radio, RefreshCw, Mountain, Snowflake, Trophy, Sparkles, Heart, Camera, User } from 'lucide-react';

const countryCodeToFlag = (code) => {
  if (!code || code.length !== 2) return '';
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
};

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'JP', name: 'Japan' },
  { code: 'NO', name: 'Norway' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'FI', name: 'Finland' },
  { code: 'KR', name: 'South Korea' },
  { code: 'CN', name: 'China' },
  { code: 'RU', name: 'Russia' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'PL', name: 'Poland' },
  { code: 'BE', name: 'Belgium' },
  { code: 'ES', name: 'Spain' },
  { code: 'BR', name: 'Brazil' },
  { code: 'AR', name: 'Argentina' },
  { code: 'MX', name: 'Mexico' },
  { code: 'IE', name: 'Ireland' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'LV', name: 'Latvia' },
  { code: 'EE', name: 'Estonia' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'IS', name: 'Iceland' },
  { code: 'HR', name: 'Croatia' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'RO', name: 'Romania' },
  { code: 'HU', name: 'Hungary' },
  { code: 'GR', name: 'Greece' },
  { code: 'TR', name: 'Turkey' },
  { code: 'IN', name: 'India' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'KE', name: 'Kenya' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'PH', name: 'Philippines' },
  { code: 'TH', name: 'Thailand' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'MY', name: 'Malaysia' },
];

// Picsum provides stable, unique images per seed — all URLs are valid
const WINTER_ATHLETES = [
  { name: 'Mikaela Shiffrin', sport: 'Alpine Skiing', image: 'https://picsum.photos/seed/mikaela-shiffrin/400/400', instagram: 'mikaelashiffrin', facts: ['Has won more World Cup races than any skier in history.', 'Made her Olympic debut at 18 in Sochi 2014.', 'Competes in slalom, giant slalom, and super-G.', 'From Vail, Colorado.', 'Named US Olympic Committee Female Athlete of the Year multiple times.'] },
  { name: 'Chloe Kim', sport: 'Snowboarding', image: 'https://picsum.photos/seed/chloe-kim/400/400', instagram: 'chloekimsnow', facts: ['Won Olympic halfpipe gold at 17 in PyeongChang 2018.', 'First woman to land back-to-back 1080s in competition.', 'From Long Beach, California.', 'Also won gold at Beijing 2022.', 'Started snowboarding at age 4.'] },
  { name: 'Nathan Chen', sport: 'Figure Skating', image: 'https://picsum.photos/seed/nathan-chen/400/400', instagram: 'nathanwchen', facts: ['Won Olympic gold in men’s singles at Beijing 2022.', 'Five-time U.S. national champion.', 'Known for his quad jumps and consistency.', 'From Salt Lake City, Utah.', 'Studied statistics at Yale while competing.'] },
  { name: 'Lindsey Vonn', sport: 'Alpine Skiing', image: 'https://picsum.photos/seed/lindsey-vonn/400/400', instagram: 'lindseyvonn', facts: ['Four-time World Cup overall champion.', 'Olympic gold in downhill at Vancouver 2010.', '82 World Cup wins, one of the most in history.', 'From St. Paul, Minnesota.', 'Came back from multiple serious injuries.'] },
  { name: 'Shaun White', sport: 'Snowboarding', image: 'https://picsum.photos/seed/shaun-white/400/400', instagram: 'shaunwhite', facts: ['Three-time Olympic halfpipe gold medalist.', 'Also competed in skateboarding at Tokyo 2020.', 'From San Diego, California.', 'Won X Games gold multiple times.', 'Founded the snowboard company Whitespace.'] },
  { name: 'Hilary Knight', sport: 'Ice Hockey', image: 'https://picsum.photos/seed/hilary-knight/400/400', instagram: 'hilary_knight', facts: ['Four-time Olympic medalist with Team USA.', 'Plays forward and is a leading scorer.', 'From Palo Alto, California.', 'Multiple IIHF World Championship golds.', 'Advocate for women’s hockey and equal pay.'] },
  { name: 'Erin Jackson', sport: 'Speed Skating', image: 'https://picsum.photos/seed/erin-jackson/400/400', instagram: '', facts: ['Won 500m gold at Beijing 2022.', 'First Black American woman to win Olympic speed skating gold.', 'Former inline skater who switched to ice.', 'From Ocala, Florida.', 'Studied materials science at the University of Florida.'] },
  { name: 'Jessie Diggins', sport: 'Cross-Country Skiing', image: 'https://picsum.photos/seed/jessie-diggins/400/400', instagram: 'jessiediggins', facts: ['Won team sprint gold with Kikkan Randall at PyeongChang 2018.', 'First American to win World Cup overall (2021).', 'From Afton, Minnesota.', 'Known for sprint finishes and teamwork.', 'Open about mental health and eating disorder recovery.'] },
  { name: 'Elana Meyers Taylor', sport: 'Bobsled', image: 'https://picsum.photos/seed/elana-meyers/400/400', instagram: '', facts: ['Multiple Olympic medals as bobsled pilot.', 'One of the most decorated Black athletes in Winter Olympics history.', 'From Douglasville, Georgia.', 'Also a push athlete earlier in her career.', 'Mom and advocate for athletes with hearing loss.'] },
  { name: 'Red Gerard', sport: 'Snowboarding', image: 'https://picsum.photos/seed/red-gerard/400/400', instagram: '', facts: ['Won slopestyle gold at PyeongChang 2018 at 17.', 'From Silverthorne, Colorado.', 'Youngest American male snowboarder to win Olympic gold.', 'Known for creative rail tricks.', 'Grew up riding at his family’s backyard setup.'] },
  { name: 'Maddie Mastro', sport: 'Snowboarding', image: 'https://picsum.photos/seed/maddie-mastro/400/400', instagram: '', facts: ['Competes in halfpipe and has landed double cripplers.', 'From Wrightwood, California.', 'Multiple X Games and World Cup podiums.', 'Known for amplitude and technical tricks.', 'Trains alongside the best in the world at Mammoth.'] },
  { name: 'Brittany Bowe', sport: 'Speed Skating', image: 'https://picsum.photos/seed/brittany-bowe/400/400', instagram: '', facts: ['World record holder and Olympic medalist.', 'From Ocala, Florida.', 'Former inline skater and college basketball player.', 'Won 1000m bronze at Beijing 2022.', 'Known for consistency in 1000m and 1500m.'] },
  { name: 'Steven Nyman', sport: 'Alpine Skiing', image: 'https://picsum.photos/seed/steven-nyman/400/400', instagram: '', facts: ['Downhill specialist with World Cup wins.', 'From Provo, Utah.', 'Multiple Olympic team member.', 'Known for speed and risk-taking.', 'Overcame serious injuries to keep racing.'] },
  { name: 'Ashley Caldwell', sport: 'Freestyle Skiing', image: 'https://picsum.photos/seed/ashley-caldwell/400/400', instagram: '', facts: ['Aerialist with multiple World Cup wins.', 'Won mixed team aerials gold at Beijing 2022.', 'From Hamilton, Virginia.', 'Four-time Olympian.', 'Known for triple flips and consistency.'] },
  { name: 'Nick Baumgartner', sport: 'Snowboarding', image: 'https://picsum.photos/seed/nick-baumgartner/400/400', instagram: '', facts: ['Snowboard cross racer and multi-time Olympian.', 'From Iron River, Michigan.', 'Oldest US snowboarder to compete at Beijing 2022.', 'Also works as a firefighter.', 'Known for durability and team spirit.'] },
  { name: 'Megan Nick', sport: 'Freestyle Skiing', image: 'https://picsum.photos/seed/megan-nick/400/400', instagram: '', facts: ['Aerialist who won Olympic bronze at Beijing 2022.', 'From Shelburne, Vermont.', 'Former gymnast who switched to aerials.', 'World Cup podium finisher.', 'Known for clean form and difficulty.'] },
  { name: 'Jake Pates', sport: 'Snowboarding', image: 'https://picsum.photos/seed/jake-pates/400/400', instagram: '', facts: ['Halfpipe rider and Olympian.', 'From Silverthorne, Colorado.', 'Known for smooth style and amplitude.', 'Competes on the World Cup circuit.', 'Part of the next generation of US halfpipe riders.'] },
  { name: 'Maame Biney', sport: 'Short Track', image: 'https://picsum.photos/seed/maame-biney/400/400', instagram: '', facts: ['First Black woman to qualify for US Olympic short track team.', 'From Reston, Virginia.', 'Competed at PyeongChang 2018 and Beijing 2022.', 'Known for sprint speed.', 'Inspires diversity in winter sports.'] },
  { name: 'Chris Mazdzer', sport: 'Luge', image: 'https://picsum.photos/seed/chris-mazdzer/400/400', instagram: '', facts: ['Won Olympic silver in singles luge at PyeongChang 2018.', 'First American man to medal in singles luge.', 'From Saranac Lake, New York.', 'Multiple World Cup podiums.', 'Also competes in doubles.'] },
  { name: 'Summer Britcher', sport: 'Luge', image: 'https://picsum.photos/seed/summer-britcher/400/400', instagram: '', facts: ['Three-time Olympian in luge.', 'From Glen Rock, Pennsylvania.', 'World Cup race winner.', 'Known for consistency and starts.', 'Advocate for athlete mental health.'] },
];

// Custom hook for localStorage persistence
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

// Mock comments based on Feb 4, 2026 Olympic buzz
const mockComments = [
  { id: 1, user: '@VonnFanatic', text: "Can't believe Lindsey Vonn is actually back on the mountain. If she medals in Cortina, I'm getting a pizza tattoo.", status: 'pending' },
  { id: 2, user: '@Milan_Mover', text: "Traffic in Milan is already a nightmare and the Opening Ceremony hasn't even started. San Siro is going to be a zoo.", status: 'pending' },
  { id: 3, user: '@WinterNerd26', text: "MARIAH CAREY AND ANDREA BOCELLI?! The Opening Ceremony budget must be insane. Italy is not playing around.", status: 'pending' },
  { id: 4, user: '@PuckHead_', text: "Finally, NHL players are back. Crosby vs. McDavid on Olympic ice is the only thing that matters this month.", status: 'pending' },
  { id: 5, user: '@EcoWarrior_IT', text: "80% existing venues is a lie when you consider the 'temporary' infrastructure costs. Sustainability or greenwashing?", status: 'pending' },
  { id: 6, user: '@SnowboardGuru', text: "The halfpipe in Livigno looks absolutely insane. This is going to be the best snowboard competition ever.", status: 'pending' },
  { id: 7, user: '@ItalianPride26', text: "Hosting the Olympics in Italy again after Torino 2006 feels like coming home. Forza Italia!", status: 'pending' },
  { id: 8, user: '@SkiMom2026', text: "Booked our flights to Milan months ago and prices STILL went up. Worth it to see the games in person though!", status: 'pending' },
  { id: 9, user: '@HockeyHistorian', text: "This could be the last Olympics for some legends. Cherish every moment of Milano-Cortina 2026.", status: 'pending' },
  { id: 10, user: '@AlpineAddict', text: "The Cortina downhill course is going to separate the brave from the reckless. Can't wait!", status: 'pending' },
  { id: 11, user: '@FigureSkatingFan', text: "The ice skating venue in Milan looks stunning. Can't wait to see the performances!", status: 'pending' },
  { id: 12, user: '@TeamUSA_Supporter', text: "Let's go Team USA! Bring home the gold from Italy!", status: 'pending' },
  { id: 13, user: '@OlympicHistory', text: "Milano-Cortina marks a return to the Italian Alps. The legacy of these games will be incredible.", status: 'pending' },
  { id: 14, user: '@SkiJumper2026', text: "The ski jump in Cortina is legendary. This is going to be epic to watch!", status: 'pending' },
  { id: 15, user: '@WinterSportsFan', text: "Two more days until the opening ceremony! The anticipation is killing me!", status: 'pending' },
  { id: 16, user: '@CurlingEnthusiast', text: "Curling doesn't get enough love but it's one of the most strategic sports at the Winter Olympics!", status: 'pending' },
  { id: 17, user: '@IceHockeyFan', text: "USA vs Canada in hockey is always the best rivalry. Can't wait for Milano-Cortina!", status: 'pending' },
  { id: 18, user: '@SnowSports2026', text: "The freestyle skiing events are going to be absolutely wild this year. So pumped!", status: 'pending' },
  { id: 19, user: '@OlympicDreamer', text: "Watching the Olympics reminds me why I love winter sports. Pure inspiration!", status: 'pending' },
  { id: 20, user: '@AlpineRacer', text: "The downhill course in Cortina is one of the most challenging. Respect to all the athletes!", status: 'pending' },
  { id: 21, user: '@BiathlonBuff', text: "Biathlon combines skiing and shooting - doesn't get cooler than that! Go Team USA!", status: 'pending' },
  { id: 22, user: '@LugeLife', text: "Luge athletes are absolutely fearless. The speeds they reach are insane!", status: 'pending' },
  { id: 23, user: '@SpeedSkater', text: "Speed skating on the big oval is going to be incredible. Can't wait to watch!", status: 'pending' },
  { id: 24, user: '@WinterGames26', text: "Milano-Cortina 2026 is going to set a new standard for Winter Olympics!", status: 'pending' },
  { id: 25, user: '@SnowboardX', text: "Snowboard cross is the most exciting event. Those crashes though... intense!", status: 'pending' }
];

const winterEvents = [
  'Alpine Skiing',
  'Biathlon',
  'Bobsled',
  'Cross-Country Skiing',
  'Curling',
  'Figure Skating',
  'Freestyle Skiing',
  'Ice Hockey',
  'Luge',
  'Nordic Combined',
  'Short Track Speed Skating',
  'Skeleton',
  'Ski Jumping',
  'Snowboarding',
  'Speed Skating'
];

const DAILY_LIMIT = 25; // Well below Mastodon limits but enough content

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userProfile, setUserProfile] = useLocalStorage('TEAM26_PROFILE', null);
  const [sentimentQueue, setSentimentQueue] = useLocalStorage('TEAM26_SENTIMENT', mockComments);
  const [availability, setAvailability] = useLocalStorage('TEAM26_AVAILABILITY', {});
  const [stats, setStats] = useLocalStorage('TEAM26_STATS', {
    analyzed: 0,
    positive: 0,
    neutral: 0,
    negative: 0,
    shifts: 0
  });
  const [dailyStats, setDailyStats] = useLocalStorage('TEAM26_DAILY', {
    date: new Date().toDateString(),
    analyzed: 0
  });
  const [isOnDuty, setIsOnDuty] = useLocalStorage('TEAM26_ON_DUTY', false);
  const [hasVisitedTasksTab, setHasVisitedTasksTab] = useLocalStorage('TEAM26_VISITED_TASKS', false);
  const [currentShift, setCurrentShift] = useState(null);
  const [useLiveFeed, setUseLiveFeed] = useState(false);
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);
  const [feedError, setFeedError] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRegistration, setShowRegistration] = useState(!userProfile);
  const [accountForm, setAccountForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    favoriteEvent: '',
    profilePicture: '',
    country: 'US'
  });

  // Registration form state
  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    favoriteEvent: '',
    profilePicture: '',
    country: 'US'
  });

  // Derived values (must be before useEffects that reference them)
  const pendingComments = sentimentQueue.filter(c => c.status === 'pending');
  const currentComment = pendingComments[0];
  const isDailyLimitReached = dailyStats.analyzed >= DAILY_LIMIT;

  // Olympic dates and "live today" (must be before useEffects that reference isLiveToday)
  const olympicDates = [];
  for (let i = 5; i <= 22; i++) {
    olympicDates.push(`2026-02-${i.toString().padStart(2, '0')}`);
  }
  const todayKey = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();
  const nextAvailableDate = olympicDates.find(d => d > todayKey && (availability[d] || 'Available') === 'Available');
  const nextAvailableDateFormatted = nextAvailableDate
    ? new Date(nextAvailableDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : 'an upcoming games day';
  const isLiveToday = olympicDates.includes(todayKey) && (availability[todayKey] || 'Available') === 'Available';
  const isTodayMarkedOff = olympicDates.includes(todayKey) && availability[todayKey] === 'Off';
  const todayFormatted = new Date(todayKey + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const availableCount = olympicDates.filter(d => (availability[d] || 'Available') === 'Available').length;
  const offCount = olympicDates.filter(d => availability[d] === 'Off').length;

  // Reset daily stats if it's a new day
  useEffect(() => {
    setDailyStats(prev => {
      const today = new Date().toDateString();
      if (prev.date !== today) return { date: today, analyzed: 0 };
      return prev;
    });
  }, []);

  const handleRegistration = (e) => {
    e.preventDefault();
    setUserProfile({ ...regForm, needsAvailabilityOnboarding: true });
    setShowRegistration(false);
    setCurrentView('availability');
  };

  // After registration, force Availability until user has set at least one day
  useEffect(() => {
    if (userProfile?.needsAvailabilityOnboarding) {
      setCurrentView('availability');
    }
  }, [userProfile?.needsAvailabilityOnboarding]);

  // Sync account form when opening Account tab
  useEffect(() => {
    if (currentView === 'account' && userProfile) {
      setAccountForm({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        email: userProfile.email || '',
        favoriteEvent: userProfile.favoriteEvent || '',
        profilePicture: userProfile.profilePicture || '',
        country: userProfile.country || 'US'
      });
    }
  }, [currentView, userProfile]);

  const handleAccountSave = (e) => {
    e.preventDefault();
    setUserProfile(prev => (prev ? { ...prev, ...accountForm } : accountForm));
  };

  // Fetch live comments from Mastodon
  const fetchLiveComments = async () => {
    setIsLoadingFeed(true);
    setFeedError(null);

    try {
      const hashtags = ['MilanoCortina2026', 'Olympics2026', 'WinterOlympics', 'Olympics', 'WinterGames'];
      let allPosts = [];

      for (const tag of hashtags) {
        try {
          const response = await fetch(`https://mastodon.social/api/v1/timelines/tag/${tag}?limit=20`);
          if (response.ok) {
            const data = await response.json();
            const posts = data.map(post => ({
              id: `live-${post.id}`,
              user: `@${post.account.username}`,
              text: post.content.replace(/<[^>]*>/g, '').substring(0, 280),
              status: 'pending'
            }));
            allPosts = [...allPosts, ...posts];
          }
        } catch (err) {
          console.log(`Failed to fetch #${tag}:`, err);
        }

        if (allPosts.length >= DAILY_LIMIT) break;
      }

      if (allPosts.length > 0) {
        const uniquePosts = allPosts
          .filter((post, index, self) =>
            index === self.findIndex((p) => p.text === post.text)
          )
          .filter(post => post.text.trim().length > 10)
          .slice(0, DAILY_LIMIT);

        if (uniquePosts.length > 0) {
          setSentimentQueue(uniquePosts);
          setUseLiveFeed(true);
          setFeedError(null);
        } else {
          setFeedError("Limited posts found. Using curated comments for best experience.");
          setSentimentQueue(mockComments);
          setUseLiveFeed(false);
        }
      } else {
        setFeedError("Could not load live feed. Using curated comments for optimal experience.");
        setSentimentQueue(mockComments);
        setUseLiveFeed(false);
      }
    } catch (error) {
      console.error('Error fetching live feed:', error);
      setFeedError("Network unavailable. Using curated comments.");
      setSentimentQueue(mockComments);
      setUseLiveFeed(false);
    } finally {
      setIsLoadingFeed(false);
    }
  };

  const resetToMockData = () => {
    setSentimentQueue(mockComments);
    setUseLiveFeed(false);
    setFeedError(null);
  };

  const handleSentiment = (id, sentiment) => {
    setSentimentQueue(prev => prev.map(item =>
      item.id === id ? { ...item, status: sentiment.toLowerCase() } : item
    ));

    setStats(prev => ({
      ...prev,
      analyzed: prev.analyzed + 1,
      [sentiment.toLowerCase()]: prev[sentiment.toLowerCase()] + 1
    }));

    const newDailyAnalyzed = dailyStats.analyzed + 1;
    setDailyStats(prev => ({
      ...prev,
      analyzed: newDailyAnalyzed
    }));

    // Check if they just hit the daily limit — count as one completed shift
    if (newDailyAnalyzed >= DAILY_LIMIT) {
      setStats(prev => ({ ...prev, shifts: prev.shifts + 1 }));
      setTimeout(() => setShowCelebration(true), 500);
    }

    };

  const toggleAvailability = (date) => {
    const statuses = ['Available', 'Off'];
    const currentStatus = availability[date] || 'Available';
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];

    setAvailability(prev => ({
      ...prev,
      [date]: nextStatus
    }));
  };

  const handleSaveCalendar = () => {
    setUserProfile(prev => (prev ? { ...prev, needsAvailabilityOnboarding: false } : prev));
    setCurrentView('dashboard');
  };

  // Background patterns for each view
  const getBackgroundPattern = () => {
    const patterns = {
      dashboard: (
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
          <Mountain className="absolute top-10 right-20 w-64 h-64 text-cyan-400" style={{ transform: 'rotate(-15deg)' }} />
          <Snowflake className="absolute bottom-20 left-10 w-48 h-48 text-pink-400 animate-spin" style={{ animationDuration: '20s' }} />
          <Mountain className="absolute bottom-32 right-40 w-56 h-56 text-purple-400" style={{ transform: 'rotate(25deg)' }} />
        </div>
      ),
      sentiment: (
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
          <Snowflake className="absolute top-20 left-20 w-32 h-32 text-cyan-300 animate-pulse" />
          <Snowflake className="absolute top-40 right-32 w-40 h-40 text-pink-300" style={{ animationDelay: '1s' }} />
          <Snowflake className="absolute bottom-40 left-40 w-36 h-36 text-purple-300 animate-pulse" style={{ animationDelay: '2s' }} />
          <Mountain className="absolute bottom-10 right-10 w-72 h-72 text-cyan-400" style={{ transform: 'rotate(15deg)' }} />
        </div>
      ),
      availability: (
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
          <Mountain className="absolute top-0 left-20 w-96 h-96 text-cyan-400" style={{ transform: 'rotate(-20deg)' }} />
          <Mountain className="absolute top-20 right-10 w-80 h-80 text-pink-400" style={{ transform: 'rotate(30deg)' }} />
          <Snowflake className="absolute bottom-40 left-1/2 w-48 h-48 text-purple-300 animate-spin" style={{ animationDuration: '30s' }} />
        </div>
      ),
      account: (
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
          <Mountain className="absolute top-20 left-20 w-64 h-64 text-cyan-400 animate-pulse" />
          <Snowflake className="absolute bottom-20 right-20 w-48 h-48 text-pink-400" style={{ animationDuration: '20s' }} />
        </div>
      ),
      funfacts: (
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
          <Snowflake className="absolute top-20 right-20 w-40 h-40 text-cyan-300 animate-pulse" />
          <Mountain className="absolute bottom-20 left-20 w-56 h-56 text-pink-400" style={{ transform: 'rotate(-15deg)' }} />
        </div>
      )
    };
    return patterns[currentView] || patterns.dashboard;
  };

  // Registration Screen
  if (showRegistration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans flex items-center justify-center p-6">
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
          <Mountain className="absolute top-20 left-20 w-64 h-64 text-cyan-400 animate-pulse" />
          <Mountain className="absolute bottom-20 right-20 w-80 h-80 text-pink-400" style={{ transform: 'rotate(25deg)' }} />
          <Snowflake className="absolute top-1/2 left-1/2 w-56 h-56 text-purple-300 animate-spin" style={{ animationDuration: '25s' }} />
        </div>

        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img
                src="/logo-2026.png"
                alt="Milano Cortina 2026"
                className="h-40 w-auto object-contain brightness-125 contrast-110"
              />
            </div>
            <h1 className="text-4xl font-black mb-3">Welcome to the Milano-Cortina 2026 Digital Volunteer Program</h1>
            <p className="text-white/60 mt-2">Please complete your volunteer profile to begin</p>
          </div>

          <form onSubmit={handleRegistration} className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <label className="block text-sm font-bold text-cyan-300">Profile Picture</label>
              <div className="relative">
                <div className="w-28 h-28 rounded-full border-4 border-cyan-400/50 bg-white/5 flex items-center justify-center overflow-hidden">
                  {regForm.profilePicture ? (
                    <img src={regForm.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl text-white/40 font-bold">?</span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full p-2 cursor-pointer shadow-lg">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setRegForm((prev) => ({ ...prev, profilePicture: reader.result }));
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <Camera className="w-4 h-4" />
                </label>
              </div>
              <p className="text-xs text-white/50">Click the icon to add a photo (optional)</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-cyan-300">First Name *</label>
                <input
                  type="text"
                  required
                  value={regForm.firstName}
                  onChange={(e) => setRegForm({...regForm, firstName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-cyan-300">Last Name *</label>
                <input
                  type="text"
                  required
                  value={regForm.lastName}
                  onChange={(e) => setRegForm({...regForm, lastName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-cyan-300">Email Address *</label>
              <input
                type="email"
                required
                value={regForm.email}
                onChange={(e) => setRegForm({...regForm, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-cyan-300">Country of origin *</label>
              <select
                required
                value={regForm.country}
                onChange={(e) => setRegForm({...regForm, country: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              >
                <optgroup label="United States">
                  <option value="US" className="bg-slate-900 font-bold text-base">United States</option>
                </optgroup>
                <optgroup label="Other countries">
                  {COUNTRIES.filter(c => c.code !== 'US').map(c => (
                    <option key={c.code} value={c.code} className="bg-slate-900 text-white/70">{c.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-cyan-300">Favorite Winter Olympic Event *</label>
              <select
                required
                value={regForm.favoriteEvent}
                onChange={(e) => setRegForm({...regForm, favoriteEvent: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              >
                <option value="">Select an event...</option>
                {winterEvents.map(event => (
                  <option key={event} value={event} className="bg-slate-900">{event}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl font-black text-xl hover:scale-105 transition-transform shadow-2xl"
            >
              START VOLUNTEERING
            </button>
          </form>

          <p className="text-xs text-white/40 text-center mt-6">
            By registering, you agree to the Volunteer Terms & Conditions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans relative flex flex-col">
      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-4 border-yellow-400 rounded-3xl p-12 max-w-2xl mx-4 text-center relative overflow-hidden">
            {/* Animated sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute text-yellow-300 animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${20 + Math.random() * 30}px`,
                    height: `${20 + Math.random() * 30}px`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6 animate-bounce" />
            <h2 className="text-5xl font-black mb-4 text-yellow-300">Outstanding Work!</h2>
            <p className="text-2xl mb-6">You've completed your daily quota of {DAILY_LIMIT} comment reviews!</p>
            <div className="bg-white/10 rounded-2xl p-6 mb-6 backdrop-blur-sm">
              <p className="text-lg mb-4">
                <span className="font-black text-cyan-300">{userProfile?.firstName} {userProfile?.lastName}</span>
                , your dedication to the Milano-Cortina 2026 Games is exceptional!
              </p>
              <p className="text-white/80">
                The Olympics Media team has been notified of your completed tasks.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 mb-6 px-4 py-3 bg-white/15 rounded-xl">
              <Heart className="w-6 h-6 animate-pulse text-white flex-shrink-0" />
              <span className="font-bold text-white drop-shadow-sm">Thank you for supporting the Olympic movement!</span>
              <Heart className="w-6 h-6 animate-pulse text-white flex-shrink-0" />
            </div>
            <button
              onClick={() => setShowCelebration(false)}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl font-black text-lg hover:scale-105 transition-transform shadow-2xl"
            >
              RETURN TO DASHBOARD
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Background Pattern */}
      {getBackgroundPattern()}

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-7 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            {/* Official Milano Cortina 2026 Logo */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <img
                src="/logo-2026.png"
                alt="Milano Cortina 2026"
                className="h-14 sm:h-24 w-auto object-contain brightness-125 contrast-110 flex-shrink-0"
              />
              <div className="min-w-0">
                <h1 className="font-black text-lg sm:text-2xl tracking-tight truncate">Milano-Cortina 2026</h1>
                <p className="text-xs text-cyan-300 font-medium hidden sm:block">Digital Volunteer Portal</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <div className="flex items-center gap-3 mr-3">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-400/50 bg-white/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                {userProfile?.profilePicture ? (
                  <img src={userProfile.profilePicture} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg font-bold text-cyan-300/80">
                    {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0] || '?'}
                  </span>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-white/60">Volunteer</p>
                <p className="font-bold text-sm">{userProfile?.firstName} {userProfile?.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-400/30">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-emerald-300">SYNCED</span>
            </div>
            {isLiveToday && (
              <div className="flex items-center gap-2 bg-pink-500/20 px-3 py-1.5 rounded-full border border-pink-400/30">
                <Radio className="w-3 h-3 text-pink-400 animate-pulse" />
                <span className="text-xs font-semibold text-pink-300">LIVE TODAY</span>
              </div>
            )}
            {useLiveFeed && (
              <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1.5 rounded-full border border-orange-400/30">
                <RefreshCw className="w-3 h-3 text-orange-400" />
                <span className="text-xs font-semibold text-orange-300">LIVE</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation - only Availability until onboarding complete */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm overflow-x-auto">
        <div className="container mx-auto px-4 sm:px-6 flex gap-0 sm:gap-1 flex-nowrap sm:flex-wrap min-w-0">
          {(userProfile?.needsAvailabilityOnboarding
            ? [{ id: 'availability', label: `${userProfile?.firstName ? userProfile.firstName + "'s" : 'My'} Calendar`, icon: Calendar }]
            : [
                { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                { id: 'sentiment', label: `${userProfile?.firstName ? userProfile.firstName + "'s" : 'My'} Tasks`, icon: MessageSquare },
                { id: 'availability', label: `${userProfile?.firstName ? userProfile.firstName + "'s" : 'My'} Calendar`, icon: Calendar },
                { id: 'funfacts', label: 'Fun Facts', icon: Sparkles },
                { id: 'account', label: 'Account', icon: User },
              ]
            ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setCurrentView(id);
                if (id === 'sentiment') setHasVisitedTasksTab(true);
              }}
              className={`px-4 sm:px-6 py-3 sm:py-4 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 flex-shrink-0 min-h-[44px] ${
                currentView === id
                  ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10 flex-1">
        {currentView === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-black">{userProfile?.firstName || 'Volunteer'}'s Olympic Dashboard</h2>
                  {!userProfile?.needsAvailabilityOnboarding && !hasVisitedTasksTab && (
                    <div className="flex items-center gap-2 bg-lime-400/20 border border-lime-400/60 rounded-xl px-4 py-2 text-lime-300">
                      <MessageSquare className="w-5 h-5 flex-shrink-0 animate-gentle-jump" />
                      <span className="text-sm font-medium">
                        Go to <strong className="font-bold text-white">{userProfile?.firstName ? userProfile.firstName + "'s" : 'Your'} Tasks</strong> to get started
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-cyan-300 text-sm mt-1 flex items-center gap-2">
                  <Mountain className="w-4 h-4 flex-shrink-0" />
                  Milano-Cortina 2026
                </p>
              </div>
            </div>

            {/* Daily Limit Notice */}
            {isDailyLimitReached && (
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-2xl p-6 flex items-start gap-4">
                <CheckCircle className="w-12 h-12 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="font-black text-xl mb-2 text-green-300">
                    Thank you {userProfile?.firstName || 'Volunteer'}!
                  </h3>
                  <p className="text-green-100/80 mb-2">
                    Your Daily Tasks are complete and we'll see you on {nextAvailableDateFormatted}.
                  </p>
                  <p className="text-green-100/80">
                    You're helping to make the Olympics a fun experience for everyone.
                  </p>
                </div>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Analyzed', value: stats.analyzed, color: 'from-cyan-500 to-blue-500', icon: MessageSquare },
                { label: 'Good comments', value: stats.positive, color: 'from-green-500 to-emerald-500', icon: CheckCircle },
                { label: 'Inappropriate comments', value: stats.negative, color: 'from-red-500 to-pink-500', icon: AlertTriangle },
                { label: 'Volunteering Shifts Completed', value: stats.shifts, color: 'from-purple-500 to-pink-500', icon: Award },
              ].map(({ label, value, color, icon: Icon }) => (
                <div key={label} className={`bg-gradient-to-br ${color} p-6 rounded-2xl shadow-2xl backdrop-blur-sm`}>
                  <Icon className="w-8 h-8 mb-3 opacity-80" />
                  <div className="text-4xl font-black mb-1">{value.toLocaleString()}</div>
                  <div className="text-sm font-semibold opacity-90">{label}</div>
                </div>
              ))}
            </div>

            {/* Daily Progress Bar */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold">Today's Progress</span>
                <span className="text-cyan-300 font-black">{dailyStats.analyzed}/{DAILY_LIMIT}</span>
              </div>
              <div className="w-full h-4 bg-black/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-pink-500 transition-all duration-500"
                  style={{ width: `${Math.min((dailyStats.analyzed / DAILY_LIMIT) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-white/60 mt-2">
                {isDailyLimitReached ? "Daily limit reached! Great work!" : `${DAILY_LIMIT - dailyStats.analyzed} reviews remaining today`}
              </p>
            </div>

            {/* Certification Notice */}
            {stats.shifts >= 10 && (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/50 rounded-2xl p-6 flex items-start gap-4">
                <Award className="w-12 h-12 text-yellow-400 flex-shrink-0" />
                <div>
                  <h3 className="font-black text-xl mb-2 text-yellow-300">Certificate Ready!</h3>
                  <p className="text-yellow-100/80">You've completed 10 shifts. Your digital volunteer certificate signed by IOC President Thomas Bach is ready for download.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {currentView === 'sentiment' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl sm:text-3xl font-black">Live Social Media Comments from the Winter Olympics</h2>
                <p className="text-white/60 mt-1 flex items-center gap-2 text-sm sm:text-base">
                  <Snowflake className="w-4 h-4" />
                  Keep Olympic chats safe and fun for fans!
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="bg-pink-500/20 px-4 py-2 rounded-full border border-pink-400/30">
                  <span className="text-pink-300 font-bold">{pendingComments.length} incomplete</span>
                </div>
                <button
                  onClick={fetchLiveComments}
                  disabled={isLoadingFeed || isDailyLimitReached || isTodayMarkedOff}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full font-bold text-sm hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 shadow-lg"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingFeed ? 'animate-spin' : ''}`} />
                  {isLoadingFeed ? 'Loading...' : 'Load Live Feed'}
                </button>
              </div>
            </div>

            {feedError && (
              <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-yellow-300 text-sm font-medium">{feedError}</p>
              </div>
            )}

            {isTodayMarkedOff && !isDailyLimitReached && (
              <div className="bg-orange-500/20 border-2 border-orange-400/50 rounded-xl p-6 text-center backdrop-blur-sm">
                <AlertTriangle className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                <p className="font-bold text-orange-300">
                  You marked this day as Off Duty on your Calendar. Change <strong className="text-white">{todayFormatted}</strong> to <strong className="text-white">Available</strong> if you'd like to volunteer today.
                </p>
              </div>
            )}

            {isDailyLimitReached && (
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-xl p-8 text-center backdrop-blur-sm">
                <Trophy className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="font-black text-2xl mb-2">Daily Limit Reached!</h3>
                <p className="text-white/80">You've completed all {DAILY_LIMIT} reviews for today. Excellent work!</p>
                <p className="text-white/60 mt-2 text-sm">Come back {nextAvailableDateFormatted} for more tasks.</p>
              </div>
            )}

            {isLiveToday && currentComment && !isDailyLimitReached && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 relative overflow-hidden shadow-2xl">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full"></div>
                    <span className="font-bold text-cyan-300">{currentComment.user}</span>
                  </div>
                  <p className="text-2xl leading-relaxed">{currentComment.text}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      handleSentiment(currentComment.id, 'Positive');
                    }}
                    className="flex-1 min-h-[48px] sm:min-h-0 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 py-4 rounded-xl font-black text-base sm:text-lg transition-all hover:scale-105 active:scale-100 shadow-xl flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    POSITIVE
                  </button>
                  <button
                    onClick={() => handleSentiment(currentComment.id, 'Neutral')}
                    className="flex-1 min-h-[48px] sm:min-h-0 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-4 rounded-xl font-black text-base sm:text-lg transition-all hover:scale-105 active:scale-100 shadow-xl flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5 flex-shrink-0" />
                    NEUTRAL
                  </button>
                  <button
                    onClick={() => handleSentiment(currentComment.id, 'Negative')}
                    className="flex-1 min-h-[48px] sm:min-h-0 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 py-4 rounded-xl font-black text-base sm:text-lg transition-all hover:scale-105 active:scale-100 shadow-xl flex items-center justify-center gap-2"
                  >
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                    FLAG
                  </button>
                </div>
              </div>
            )}

            {isLiveToday && !currentComment && !isDailyLimitReached && (
              <div className="bg-cyan-500/20 border-2 border-cyan-400/50 rounded-xl p-12 text-center backdrop-blur-sm">
                <CheckCircle className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-black text-2xl mb-2">Queue Complete!</h3>
                <p className="text-white/60">All pending comments have been analyzed. Great work!</p>
              </div>
            )}
          </div>
        )}

        {currentView === 'availability' && (
          <div className="space-y-6">
            <div className="flex justify-start">
              <button
                type="button"
                onClick={handleSaveCalendar}
                className="px-6 py-4 bg-lime-400 hover:bg-lime-300 text-slate-900 font-black text-lg rounded-xl shadow-lg hover:scale-105 transition-all"
              >
                Save my calendar
              </button>
            </div>
            {userProfile?.needsAvailabilityOnboarding && (
              <div className="bg-cyan-500/20 border-2 border-cyan-400/50 rounded-2xl p-6">
                <h3 className="font-black text-xl mb-2 text-cyan-300">Welcome! Set your availability</h3>
                <p className="text-white/80">Tap any date below to toggle between <strong>Available</strong> and <strong>Off</strong>. Change as many days as you need, then click <strong>Save my calendar</strong> when you're done.</p>
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black">{userProfile?.firstName || 'Volunteer'}'s Calendar</h2>
                <p className="text-white/60 mt-1 flex items-center gap-2 text-sm sm:text-base">
                  <Mountain className="w-4 h-4 flex-shrink-0" />
                  Milano-Cortina 2026 • February 5-22
                </p>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 bg-white/5 backdrop-blur-xl rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-white/10 flex-wrap">
                <span className="font-bold text-green-300">Available: <span className="text-white text-xl sm:text-2xl">{availableCount}</span> {availableCount === 1 ? 'day' : 'days'}</span>
                <span className="font-bold text-white/60">Off duty: <span className="text-white text-xl sm:text-2xl">{offCount}</span> {offCount === 1 ? 'day' : 'days'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {olympicDates.map(date => {
                const dateObj = new Date(date + 'T00:00:00');
                const status = availability[date] || 'Available';
                const statusColors = {
                  'Available': 'from-green-500 to-emerald-500',
                  'Off': 'from-gray-500 to-slate-500'
                };

                return (
                  <button
                    key={date}
                    onClick={() => toggleAvailability(date)}
                    className={`bg-gradient-to-br ${statusColors[status] || 'from-green-500 to-emerald-500'} p-4 sm:p-6 rounded-xl hover:scale-105 active:scale-100 transition-transform shadow-xl text-left backdrop-blur-sm min-h-[80px] sm:min-h-0`}
                  >
                    <div className="text-sm opacity-90 mb-1">
                      {dateObj.toLocaleDateString('en-US', { weekday: 'long' })}
                    </div>
                    <div className="font-black text-3xl mb-3">
                      {dateObj.toLocaleDateString('en-US', { month: 'long' })} {dateObj.getDate()}
                    </div>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold inline-block">
                      {status}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
              <h3 className="font-bold mb-4">Status Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries({
                  'Available': 'from-green-500 to-emerald-500',
                  'Off': 'from-gray-500 to-slate-500'
                }).map(([status, color]) => (
                  <div key={status} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded bg-gradient-to-br ${color}`}></div>
                    <span className="text-sm">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'funfacts' && (() => {
          const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
          const pairIndex = dayOfYear % 10;
          const athletesToday = [WINTER_ATHLETES[pairIndex * 2], WINTER_ATHLETES[pairIndex * 2 + 1]];
          return (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black">Fun Facts</h2>
                <p className="text-cyan-300 text-sm mt-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  American Winter Olympic athletes — 2 new profiles every day
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {athletesToday.map((athlete, i) => (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 transition-all duration-300 hover:border-slate-400/40 hover:ring-2 hover:ring-slate-400/60 hover:ring-offset-2 hover:ring-offset-slate-900 hover:shadow-[0_0_40px_rgba(192,192,192,0.2)]"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-cyan-400/50 overflow-hidden bg-white/10 flex-shrink-0 mb-4">
                        <img src={athlete.image} alt={athlete.name} className="w-full h-full object-cover" />
                      </div>
                      {athlete.instagram ? (
                        <a
                          href={`https://instagram.com/${athlete.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-300 hover:text-cyan-200 font-bold text-sm mb-1"
                        >
                          @{athlete.instagram}
                        </a>
                      ) : null}
                      <h3 className="text-xl font-black mb-1">{athlete.name}</h3>
                      <p className="text-white/60 text-sm mb-4">{athlete.sport}</p>
                    </div>
                    <ul className="space-y-2 text-left">
                      {athlete.facts.map((fact, j) => (
                        <li key={j} className="text-white/90 text-sm sm:text-base flex gap-2">
                          <span className="text-cyan-400 flex-shrink-0">•</span>
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="text-center pt-4">
                <a
                  href="https://www.teamusa.com/milano-cortina-2026/roster"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-cyan-300 hover:text-cyan-200 font-bold text-lg underline underline-offset-2 transition-colors"
                >
                  Explore Team USA's winter athletes this year!
                </a>
              </div>
            </div>
          );
        })()}

        {currentView === 'account' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div>
              <h2 className="text-3xl font-black">Account</h2>
              <p className="text-cyan-300 text-sm mt-1 flex items-center gap-2">
                <User className="w-4 h-4" />
                Update your profile and picture
              </p>
            </div>

            <form onSubmit={handleAccountSave} className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <label className="block text-sm font-bold text-cyan-300">Profile Picture</label>
                <div className="flex items-center justify-center gap-4">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full border-4 border-cyan-400/50 bg-white/5 flex items-center justify-center overflow-hidden">
                      {accountForm.profilePicture ? (
                        <img src={accountForm.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl text-white/40 font-bold">?</span>
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full p-2 cursor-pointer shadow-lg">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => setAccountForm((prev) => ({ ...prev, profilePicture: reader.result }));
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <Camera className="w-4 h-4" />
                    </label>
                  </div>
                  {accountForm.country && (
                    <span className="text-5xl sm:text-6xl" title={COUNTRIES.find(c => c.code === accountForm.country)?.name}>{countryCodeToFlag(accountForm.country)}</span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-cyan-300">First Name</label>
                  <input
                    type="text"
                    value={accountForm.firstName}
                    onChange={(e) => setAccountForm(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-cyan-300">Last Name</label>
                  <input
                    type="text"
                    value={accountForm.lastName}
                    onChange={(e) => setAccountForm(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-cyan-300">Email Address</label>
                <input
                  type="email"
                  value={accountForm.email}
                  onChange={(e) => setAccountForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-cyan-300">Country of origin</label>
                <select
                  value={accountForm.country}
                  onChange={(e) => setAccountForm(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                >
                  {COUNTRIES.map(c => (
                    <option key={c.code} value={c.code} className="bg-slate-900">{c.name} {countryCodeToFlag(c.code)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-cyan-300">Favorite Winter Olympic Event</label>
                <select
                  value={accountForm.favoriteEvent}
                  onChange={(e) => setAccountForm(prev => ({ ...prev, favoriteEvent: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                >
                  <option value="">Select an event...</option>
                  {winterEvents.map(event => (
                    <option key={event} value={event} className="bg-slate-900">{event}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl font-black text-xl hover:scale-105 transition-transform shadow-2xl"
              >
                SAVE CHANGES
              </button>

              <button
                type="button"
                onClick={() => {
                  ['TEAM26_PROFILE', 'TEAM26_SENTIMENT', 'TEAM26_AVAILABILITY', 'TEAM26_STATS', 'TEAM26_DAILY', 'TEAM26_ON_DUTY', 'TEAM26_VISITED_TASKS'].forEach(key => localStorage.removeItem(key));
                  window.location.reload();
                }}
                className="w-full py-3 mt-4 border border-white/20 rounded-xl font-bold text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                Start over — return to registration
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 mt-auto py-4 sm:py-6 backdrop-blur-sm relative z-10" />
    </div>
  );
};

export default App;
