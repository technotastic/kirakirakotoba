document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-scores');
    const gameArea = document.getElementById('game-area');
    const sceneDescriptionEl = document.getElementById('scene-description');
    const choicesContainer = document.getElementById('choices-container');
    const feedbackEl = document.getElementById('feedback');
    const scoreSpans = {
        easy: document.getElementById('score-easy'),
        medium: document.getElementById('score-medium'),
        hard: document.getElementById('score-hard'),
    };
    const attemptsSpans = {
        easy: document.getElementById('attempts-easy'),
        medium: document.getElementById('attempts-medium'),
        hard: document.getElementById('attempts-hard'),
    };

    // --- Data Store (Self-Contained) ---
    // Expanded to ~100 entries. Difficulty added.
    const onomatopoeiaData = [
        // --- Easy 🌱 ---
        { word: 'ワンワン', meanings: ['woof woof (dog bark)'], difficulty: 'easy' },
        { word: 'ニャーニャー', meanings: ['meow meow (cat sound)'], difficulty: 'easy' },
        { word: 'ザーザー', meanings: ['sound of heavy rain or rushing water'], difficulty: 'easy' },
        { word: 'ゴクゴク', meanings: ['gulping sound (drinking quickly)'], difficulty: 'easy' },
        { word: 'パクパク', meanings: ['sound of eating, flapping mouth'], difficulty: 'easy' },
        { word: 'ドキドキ', meanings: ['thump thump (heart beating fast - excitement/nervousness)'], difficulty: 'easy' },
        { word: 'キラキラ', meanings: ['sparkling, glittering'], difficulty: 'easy' },
        { word: 'シトシト', meanings: ['sound of gentle rain, drizzle'], difficulty: 'easy' },
        { word: 'ピンポーン', meanings: ['ding dong (doorbell)'], difficulty: 'easy' },
        { word: 'ガチャン', meanings: ['clank, crash (something breaking or shutting)'], difficulty: 'easy' },
        { word: 'ポカポカ', meanings: ['pleasantly warm (sun, bath)'], difficulty: 'easy' },
        { word: 'ツルツル', meanings: ['smooth, slippery (surface)'], difficulty: 'easy' },
        { word: 'ブルブル', meanings: ['shivering (from cold or fear)'], difficulty: 'easy' },
        { word: 'トントン', meanings: ['tap tap, knock knock'], difficulty: 'easy' },
        { word: 'クルクル', meanings: ['spinning, revolving'], difficulty: 'easy' },
        { word: 'ニコニコ', meanings: ['smiling happily'], difficulty: 'easy' },
        { word: 'コケコッコー', meanings: ['cock-a-doodle-doo (rooster)'], difficulty: 'easy' },
        { word: 'ゲラゲラ', meanings: ['laughing loudly'], difficulty: 'easy' },
        { word: 'スヤスヤ', meanings: ['sleeping peacefully'], difficulty: 'easy' },
        { word: 'ペラペラ', meanings: ['fluent (speaking); thin, flimsy'], difficulty: 'easy' },
        { word: 'バンバン', meanings: ['bang bang (loud repeated noise)'], difficulty: 'easy' },
        { word: 'ゴロゴロ', meanings: ['rumbling (thunder); rolling; lazing around'], difficulty: 'easy' }, // Can be medium depending on usage
        { word: 'モグモグ', meanings: ['chewing, munching'], difficulty: 'easy' },
        { word: 'カンカン', meanings: ['clanging metal; boiling mad; blazing sun'], difficulty: 'easy' }, // Versatile
        { word: 'フワフワ', meanings: ['light and fluffy (clouds, cake, blanket)'], difficulty: 'easy' },
        { word: 'チクチク', meanings: ['prickling, stinging (needle, wool sweater)'], difficulty: 'easy' },
        { word: 'ジージー', meanings: ['buzzing (cicada), static noise'], difficulty: 'easy' },
        { word: 'パチパチ', meanings: ['clapping hands; crackling (fire)'], difficulty: 'easy' },
        { word: 'ガラガラ', meanings: ['rattling, empty'], difficulty: 'easy' },
        { word: 'ムシャムシャ', meanings: ['munching vigorously (like a horse)'], difficulty: 'easy' },

        // --- Medium 🤔 ---
        { word: 'シーン', meanings: ['complete silence'], difficulty: 'medium' },
        { word: 'グーグー', meanings: ['snoring sound'], difficulty: 'medium' },
        { word: 'ペコペコ', meanings: ['very hungry; bowing repeatedly'], difficulty: 'medium' },
        { word: 'イライラ', meanings: ['getting irritated, annoyed'], difficulty: 'medium' },
        { word: 'ワクワク', meanings: ['trembling with excitement or anticipation'], difficulty: 'medium' },
        { word: 'ボロボロ', meanings: ['worn out, tattered, crumbling'], difficulty: 'medium' },
        { word: 'ベタベタ', meanings: ['sticky, clingy'], difficulty: 'medium' },
        { word: 'サラサラ', meanings: ['smooth and dry (hair, powder); flowing smoothly (water)'], difficulty: 'medium' },
        { word: 'ビショビショ', meanings: ['soaking wet, drenched'], difficulty: 'medium' },
        { word: 'コソコソ', meanings: ['sneakily, stealthily'], difficulty: 'medium' },
        { word: 'ガタガタ', meanings: ['rattling, shaking, unstable'], difficulty: 'medium' },
        { word: 'ギリギリ', meanings: ['just barely, at the very limit (time, space)'], difficulty: 'medium' },
        { word: 'ブツブツ', meanings: ['muttering, grumbling; bumpy, pimply'], difficulty: 'medium' },
        { word: 'ジロジロ', meanings: ['staring intently, scrutinizing'], difficulty: 'medium' },
        { word: 'ウロウロ', meanings: ['loitering, wandering aimlessly'], difficulty: 'medium' },
        { word: 'さっぱり', meanings: ['feeling refreshed; clean, neat; not at all (with negative)'], difficulty: 'medium' },
        { word: 'ガッカリ', meanings: ['disappointed, dejected'], difficulty: 'medium' },
        { word: 'スッキリ', meanings: ['feeling refreshed, clear-headed; neat, tidy'], difficulty: 'medium' },
        { word: 'モジモジ', meanings: ['fidgeting nervously or shyly'], difficulty: 'medium' },
        { word: 'ヒソヒソ', meanings: ['whispering secretly'], difficulty: 'medium' },
        { word: 'だらだら', meanings: ['lazily, sluggishly; dripping, trickling'], difficulty: 'medium' },
        { word: 'クラクラ', meanings: ['feeling dizzy, lightheaded'], difficulty: 'medium' },
        { word: 'のろのろ', meanings: ['moving very slowly'], difficulty: 'medium' },
        { word: 'ふらふら', meanings: ['staggering, unsteady; wandering aimlessly'], difficulty: 'medium' },
        { word: 'ぐんぐん', meanings: ['steadily and rapidly (growing, progressing)'], difficulty: 'medium' },
        { word: 'ぐっすり', meanings: ['sleeping soundly'], difficulty: 'medium' },
        { word: 'どんより', meanings: ['overcast, gloomy, dull (weather, expression)'], difficulty: 'medium' },
        { word: 'ばっちり', meanings: ['perfectly, spot on, successfully'], difficulty: 'medium' },
        { word: 'きちんと', meanings: ['neatly, properly, accurately'], difficulty: 'medium' }, // More of a ふくし but acts like gitaigo
        { word: 'ぼんやり', meanings: ['dimly, vaguely, absent-mindedly'], difficulty: 'medium' },
        { word: 'おどおど', meanings: ['timidly, nervously, hesitantly'], difficulty: 'medium' },
        { word: 'たっぷり', meanings: ['plenty, ample, full'], difficulty: 'medium' },
        { word: 'うっかり', meanings: ['carelessly, inadvertently'], difficulty: 'medium' },
        { word: 'ひんやり', meanings: ['cool, chilly'], difficulty: 'medium' },
        { word: 'てきぱき', meanings: ['briskly, efficiently'], difficulty: 'medium' },
        { word: 'ぞくぞく', meanings: ['shivering (thrill, chill, fear); one after another'], difficulty: 'medium' },


        // --- Hard 🔥 ---
        { word: 'あっさり', meanings: ['lightly seasoned (food); simple, frank; easily (giving up)'], difficulty: 'hard' },
        { word: 'がっしり', meanings: ['solidly built, sturdy'], difficulty: 'hard' },
        { word: 'きっぱり', meanings: ['flatly, decisively, clearly'], difficulty: 'hard' },
        { word: 'じっくり', meanings: ['carefully, thoroughly, taking time'], difficulty: 'hard' },
        { word: 'すんなり', meanings: ['smoothly, without resistance; slim, slender'], difficulty: 'hard' },
        { word: 'そっくり', meanings: ['looking exactly alike; entirely, completely'], difficulty: 'hard' },
        { word: 'ばったり', meanings: ['unexpectedly (meeting someone); with a thud'], difficulty: 'hard' },
        { word: 'はっきり', meanings: ['clearly, distinctly'], difficulty: 'hard' }, // Often learned early, but nuanced usage
        { word: 'みっちり', meanings: ['intensely, hard (training); closely packed'], difficulty: 'hard' },
        { word: 'むんむん', meanings: ['stuffy, steamy, humid; brimming with energy/passion'], difficulty: 'hard' },
        { word: 'やんわり', meanings: ['softly, gently, indirectly (refusing, advising)'], difficulty: 'hard' },
        { word: 'うんざり', meanings: ['tedious, boring, fed up with'], difficulty: 'hard' },
        { word: 'げっそり', meanings: ['gaunt, haggard, visibly losing weight'], difficulty: 'hard' },
        { word: 'しょんぼり', meanings: ['dejectedly, downheartedly'], difficulty: 'hard' },
        { word: 'ちゃんと', meanings: ['properly, reliably, seriously'], difficulty: 'hard' }, // Common adverb, often used like gitaigo
        { word: 'どっかり', meanings: ['plopping down heavily; solidly'], difficulty: 'hard' },
        { word: 'どっしり', meanings: ['heavy and stable, dignified'], difficulty: 'hard' },
        { word: 'ねっとり', meanings: ['sticky and thick (like natto); persistently intimate'], difficulty: 'hard' },
        { word: 'ぼうぜん', meanings: ['dumbfounded, overcome with shock'], difficulty: 'hard' },
        { word: 'まごまご', meanings: ['flustered, confused, not knowing what to do'], difficulty: 'hard' },
        { word: 'むっと', meanings: ['sulkily, sullenly; stuffy, humid'], difficulty: 'hard' },
        { word: 'ゆったり', meanings: ['loose-fitting (clothes); relaxed, comfortable'], difficulty: 'hard' },
        { word: 'ぐちゃぐちゃ', meanings: ['messy, sloppy, pulpy'], difficulty: 'hard' },
        { word: 'しんみり', meanings: ['quietly, pensively, sentimentally'], difficulty: 'hard' },
        { word: 'そわそわ', meanings: ['restlessly, nervously, fidgety'], difficulty: 'hard' },
        { word: 'ちやほや', meanings: ['fussing over, pampering, adulating'], difficulty: 'hard' },
        { word: 'てきめん', meanings: ['instantly effective, remarkable effect'], difficulty: 'hard' },
        { word: 'ひりひり', meanings: ['stinging, smarting pain (sunburn, scrape)'], difficulty: 'hard' },
        { word: 'ぴんぴん', meanings: ['lively, energetic (especially for elderly)'], difficulty: 'hard' },
        { word: 'もやもや', meanings: ['hazy, foggy; vague feeling of anxiety or dissatisfaction'], difficulty: 'hard' },
        // Add more here if needed! Total ~100
    ];

    const scenesData = [
        // Link scenes to the 'word' field above. A word can have multiple scenes.
        // Ensure scene description strongly implies the word. Difficulty matches the word.
        // --- Easy Scenes 🌱 ---
        { description: 'The lost puppy is making a sad sound:「＿＿＿＿」', match: 'ワンワン', difficulty: 'easy' },
        { description: 'It started raining really hard outside:「＿＿＿＿」', match: 'ザーザー', difficulty: 'easy' },
        { description: 'I was so thirsty, I drank the whole bottle:「＿＿＿＿」', match: 'ゴクゴク', difficulty: 'easy' },
        { description: 'Goldfish opening and closing its mouth:「＿＿＿＿」', match: 'パクパク', difficulty: 'easy' },
        { description: 'Before the test, my heart was beating fast:「＿＿＿＿」', match: 'ドキドキ', difficulty: 'easy' },
        { description: 'The stars looked so bright in the night sky:「＿＿＿＿」', match: 'キラキラ', difficulty: 'easy' },
        { description: 'It was just a light rain, barely noticeable:「＿＿＿＿」', match: 'シトシト', difficulty: 'easy' },
        { description: 'Someone is at the door! I heard the bell:「＿＿＿＿」', match: 'ピンポーン', difficulty: 'easy' },
        { description: 'Oops! I dropped the plate and it broke:「＿＿＿＿」', match: 'ガチャン', difficulty: 'easy' },
        { description: 'Ah, sitting in the sun feels nice and warm:「＿＿＿＿」', match: 'ポカポカ', difficulty: 'easy' },
        { description: 'Be careful, the freshly waxed floor is very slippery:「＿＿＿＿」', match: 'ツルツル', difficulty: 'easy' },
        { description: 'It\'s so cold, I can\'t stop shaking:「＿＿＿＿」', match: 'ブルブル', difficulty: 'easy' },
        { description: 'Someone is knocking on the door gently:「＿＿＿＿」', match: 'トントン', difficulty: 'easy' },
        { description: 'The ballerina is spinning beautifully:「＿＿＿＿」', match: 'クルクル', difficulty: 'easy' },
        { description: 'She received a present and is smiling happily:「＿＿＿＿」', match: 'ニコニコ', difficulty: 'easy' },
        { description: 'The farm animal woke everyone up early:「＿＿＿＿」', match: 'コケコッコー', difficulty: 'easy' },
        { description: 'The comedy show was so funny, everyone laughed loudly:「＿＿＿＿」', match: 'ゲラゲラ', difficulty: 'easy' },
        { description: 'The baby is sleeping so peacefully in the crib:「＿＿＿＿」', match: 'スヤスヤ', difficulty: 'easy' },
        { description: 'He speaks French fluently:「＿＿＿＿」', match: 'ペラペラ', difficulty: 'easy' },
        { description: 'The construction site was noisy with loud sounds:「＿＿＿＿」', match: 'バンバン', difficulty: 'easy' },
        { description: 'I heard thunder rumbling in the distance:「＿＿＿＿」', match: 'ゴロゴロ', difficulty: 'easy' },
        { description: 'The child is happily eating their snacks:「＿＿＿＿」', match: 'モグモグ', difficulty: 'easy' },
        { description: 'My dad got really angry when I broke the vase:「＿＿＿＿」', match: 'カンカン', difficulty: 'easy' },
        { description: 'These marshmallows are so soft and light:「＿＿＿＿」', match: 'フワフワ', difficulty: 'easy' },
        { description: 'This sweater feels itchy on my skin:「＿＿＿＿」', match: 'チクチク', difficulty: 'easy' },
        { description: 'I can hear the annoying buzz of insects outside:「＿＿＿＿」', match: 'ジージー', difficulty: 'easy' },
        { description: 'The audience applauded after the performance:「＿＿＿＿」', match: 'パチパチ', difficulty: 'easy' },
        { description: 'The train was almost empty, making a rattling sound:「＿＿＿＿」', match: 'ガラガラ', difficulty: 'easy' },
        { description: 'The horse is eating hay very vigorously:「＿＿＿＿」', match: 'ムシャムシャ', difficulty: 'easy' },


        // --- Medium Scenes 🤔 ---
        { description: 'After the movie ended, the theater was completely silent:「＿＿＿＿」', match: 'シーン', difficulty: 'medium' },
        { description: 'My grandpa makes a loud sound when he sleeps:「＿＿＿＿」', match: 'グーグー', difficulty: 'medium' },
        { description: 'I skipped lunch and now I\'m really hungry:「＿＿＿＿」', match: 'ペコペコ', difficulty: 'medium' },
        { description: 'Waiting in this long line is making me feel annoyed:「＿＿＿＿」', match: 'イライラ', difficulty: 'medium' },
        { description: 'I can\'t wait for my trip tomorrow! I\'m so excited:「＿＿＿＿」', match: 'ワクワク', difficulty: 'medium' },
        { description: 'My favorite book is old and falling apart:「＿＿＿＿」', match: 'ボロボロ', difficulty: 'medium' },
        { description: 'I spilled juice on the table and now it feels sticky:「＿＿＿＿」', match: 'ベタベタ', difficulty: 'medium' },
        { description: 'Her long hair feels so smooth and silky:「＿＿＿＿」', match: 'サラサラ', difficulty: 'medium' },
        { description: 'I got caught in the rain without an umbrella and now I\'m soaking wet:「＿＿＿＿」', match: 'ビショビショ', difficulty: 'medium' },
        { description: 'The kids were whispering secrets to each other:「＿＿＿＿」', match: 'コソコソ', difficulty: 'medium' }, // Use ヒソヒソ as wrong answer
        { description: 'The old bridge shook and rattled when the truck drove over it:「＿＿＿＿」', match: 'ガタガタ', difficulty: 'medium' },
        { description: 'I caught the train just before the doors closed!:「＿＿＿＿」', match: 'ギリギリ', difficulty: 'medium' },
        { description: 'He was unhappy about the food and grumbled under his breath:「＿＿＿＿」', match: 'ブツブツ', difficulty: 'medium' },
        { description: 'The security guard was staring at everyone suspiciously:「＿＿＿＿」', match: 'ジロジロ', difficulty: 'medium' },
        { description: 'He didn\'t know the address and was just wandering around the station:「＿＿＿＿」', match: 'ウロウロ', difficulty: 'medium' },
        { description: 'After a nice bath, I feel refreshed:「＿＿＿＿」', match: 'さっぱり', difficulty: 'medium' },
        { description: 'I studied hard but still failed the test. I feel disappointed:「＿＿＿＿」', match: 'ガッカリ', difficulty: 'medium' },
        { description: 'Cleaning my room made me feel much better and clear-headed:「＿＿＿＿」', match: 'スッキリ', difficulty: 'medium' },
        { description: 'The shy boy was fidgeting when he had to speak:「＿＿＿＿」', match: 'モジモジ', difficulty: 'medium' },
        { description: 'They were whispering quietly about the surprise party:「＿＿＿＿」', match: 'ヒソヒソ', difficulty: 'medium' }, // Use コソコソ as wrong answer
        { description: 'Stop being lazy and just lying around all day!:「＿＿＿＿」', match: 'だらだら', difficulty: 'medium' },
        { description: 'I stood up too fast and felt dizzy for a moment:「＿＿＿＿」', match: 'クラクラ', difficulty: 'medium' },
        { description: 'The snail moved across the leaf very slowly:「＿＿＿＿」', match: 'のろのろ', difficulty: 'medium' },
        { description: 'After spinning around, the child walked unsteadily:「＿＿＿＿」', match: 'ふらふら', difficulty: 'medium' },
        { description: 'The plant is growing quickly and steadily towards the sun:「＿＿＿＿」', match: 'ぐんぐん', difficulty: 'medium' },
        { description: 'I slept soundly last night, I feel great:「＿＿＿＿」', match: 'ぐっすり', difficulty: 'medium' },
        { description: 'The sky is gray and overcast today, making me feel gloomy:「＿＿＿＿」', match: 'どんより', difficulty: 'medium' },
        { description: 'Don\'t worry, the presentation went perfectly!:「＿＿＿＿」', match: 'ばっちり', difficulty: 'medium' },
        { description: 'Please fold your clothes neatly before putting them away:「＿＿＿＿」', match: 'きちんと', difficulty: 'medium' },
        { description: 'I couldn\'t see the mountain clearly, it was just a vague shape:「＿＿＿＿」', match: 'ぼんやり', difficulty: 'medium' },
        { description: 'The new employee seemed timid and nervous when meeting the boss:「＿＿＿＿」', match: 'おどおど', difficulty: 'medium' },
        { description: 'We have plenty of time before the movie starts:「＿＿＿＿」', match: 'たっぷり', difficulty: 'medium' },
        { description: 'Oh no! I carelessly forgot my keys at home:「＿＿＿＿」', match: 'うっかり', difficulty: 'medium' },
        { description: 'The autumn air feels pleasantly cool on my skin:「＿＿＿＿」', match: 'ひんやり', difficulty: 'medium' },
        { description: 'She works quickly and efficiently, getting everything done:「＿＿＿＿」', match: 'てきぱき', difficulty: 'medium' },
        { description: 'Thinking about the ghost story sent shivers down my spine:「＿＿＿＿」', match: 'ぞくぞく', difficulty: 'medium' },


        // --- Hard Scenes 🔥 ---
        { description: 'This soup has a simple, light flavor, not too heavy:「＿＿＿＿」', match: 'あっさり', difficulty: 'hard' },
        { description: 'He has a very solid, sturdy build from weightlifting:「＿＿＿＿」', match: 'がっしり', difficulty: 'hard' },
        { description: 'She decisively refused the unreasonable request:「＿＿＿＿」', match: 'きっぱり', difficulty: 'hard' },
        { description: 'Let\'s think about this problem carefully and thoroughly:「＿＿＿＿」', match: 'じっくり', difficulty: 'hard' },
        { description: 'The negotiation went smoothly without any problems:「＿＿＿＿」', match: 'すんなり', difficulty: 'hard' },
        { description: 'Wow, the twins look exactly alike!:「＿＿＿＿」', match: 'そっくり', difficulty: 'hard' },
        { description: 'I ran into my old friend unexpectedly at the supermarket:「＿＿＿＿」', match: 'ばったり', difficulty: 'hard' },
        { description: 'Can you please speak more clearly? I can\'t understand you:「＿＿＿＿」', match: 'はっきり', difficulty: 'hard' },
        { description: 'They trained intensely for the marathon every day:「＿＿＿＿」', match: 'みっちり', difficulty: 'hard' },
        { description: 'The packed train car felt hot and stuffy:「＿＿＿＿」', match: 'むんむん', difficulty: 'hard' },
        { description: 'He gently hinted that maybe I should leave soon:「＿＿＿＿」', match: 'やんわり', difficulty: 'hard' },
        { description: 'I\'m completely fed up with doing the same boring task every day:「＿＿＿＿」', match: 'うんざり', difficulty: 'hard' },
        { description: 'After being sick for weeks, he looked pale and gaunt:「＿＿＿＿」', match: 'げっそり', difficulty: 'hard' },
        { description: 'The child looked downhearted after dropping their ice cream:「＿＿＿＿」', match: 'しょんぼり', difficulty: 'hard' },
        { description: 'Did you properly lock the door before leaving?:「＿＿＿＿」', match: 'ちゃんと', difficulty: 'hard' },
        { description: 'He came home tired and plopped down heavily onto the sofa:「＿＿＿＿」', match: 'どっかり', difficulty: 'hard' },
        { description: 'The old castle stood heavy and stable on the hill:「＿＿＿＿」', match: 'どっしり', difficulty: 'hard' },
        { description: 'This sauce has a thick, sticky consistency:「＿＿＿＿」', match: 'ねっとり', difficulty: 'hard' },
        { description: 'She was so shocked by the news, she just stood there dumbfounded:「＿＿＿＿」', match: 'ぼうぜん', difficulty: 'hard' },
        { description: 'He got flustered and confused when asked a question suddenly:「＿＿＿＿」', match: 'まごまご', difficulty: 'hard' },
        { description: 'She turned away sulkily when her idea was rejected:「＿＿＿＿」', match: 'むっと', difficulty: 'hard' },
        { description: 'These sweatpants are loose-fitting and comfortable:「＿＿＿＿」', match: 'ゆったり', difficulty: 'hard' },
        { description: 'The spilled smoothie made a sloppy mess on the floor:「＿＿＿＿」', match: 'ぐちゃぐちゃ', difficulty: 'hard' },
        { description: 'We listened quietly and pensively to the sad music:「＿＿＿＿」', match: 'しんみり', difficulty: 'hard' },
        { description: 'He kept looking at his watch nervously before the interview:「＿＿＿＿」', match: 'そわそわ', difficulty: 'hard' },
        { description: 'The popular actor is always getting fussed over by fans:「＿＿＿＿」', match: 'ちやほや', difficulty: 'hard' },
        { description: 'This medicine had an instantly remarkable effect on my headache:「＿＿＿＿」', match: 'てきめん', difficulty: 'hard' },
        { description: 'My skin is stinging from the sunburn:「＿＿＿＿」', match: 'ひりひり', difficulty: 'hard' },
        { description: 'My grandpa is over 80 but still very lively and energetic:「＿＿＿＿」', match: 'ぴんぴん', difficulty: 'hard' },
        { description: 'I have a vague feeling of anxiety, but I don\'t know why:「＿＿＿＿」', match: 'もやもや', difficulty: 'hard' },

    ];

    // --- Game State ---
    let currentDifficulty = 'easy';
    let currentScene = null;
    let currentChoices = [];
    let scores = {
        easy: { correct: 0, attempts: 0 },
        medium: { correct: 0, attempts: 0 },
        hard: { correct: 0, attempts: 0 },
    };

    // --- Functions ---

    // Shuffle array in place (Fisher-Yates)
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Load scores from LocalStorage
    function loadResults() {
        const savedScores = localStorage.getItem('giongoScores');
        if (savedScores) {
            scores = JSON.parse(savedScores);
        }
        updateScoreDisplay();
    }

    // Save scores to LocalStorage
    function saveResults() {
        localStorage.setItem('giongoScores', JSON.stringify(scores));
        updateScoreDisplay();
    }

    // Update the score display on the page
    function updateScoreDisplay() {
        for (const diff in scores) {
            scoreSpans[diff].textContent = scores[diff].correct;
            attemptsSpans[diff].textContent = scores[diff].attempts;
        }
    }

    // Reset scores
    function resetAllScores() {
        if (confirm("Are you sure you want to reset all your scores?")) {
            scores = {
                easy: { correct: 0, attempts: 0 },
                medium: { correct: 0, attempts: 0 },
                hard: { correct: 0, attempts: 0 },
            };
            saveResults(); // Save the reset scores
        }
    }

    // Select random elements without repetition
    function getRandomElements(arr, n) {
        const shuffled = [...arr]; // Clone array
        shuffle(shuffled);
        return shuffled.slice(0, n);
    }

    // Load a new question
    function loadQuestion() {
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback-hidden'; // Hide feedback visually
        choicesContainer.innerHTML = ''; // Clear old choices

        // 1. Filter scenes by difficulty
        const availableScenes = scenesData.filter(scene => scene.difficulty === currentDifficulty);
        if (availableScenes.length === 0) {
            sceneDescriptionEl.textContent = `No scenes found for ${currentDifficulty} level! Try adding more or choosing another difficulty.`;
            return;
        }

        // 2. Pick a random scene
        currentScene = availableScenes[Math.floor(Math.random() * availableScenes.length)];
        sceneDescriptionEl.textContent = currentScene.description;

        // 3. Get the correct answer word
        const correctAnswer = currentScene.match;

        // 4. Get incorrect choices (filter by difficulty, exclude correct answer)
        const potentialWrongAnswers = onomatopoeiaData.filter(item =>
            item.difficulty === currentDifficulty && item.word !== correctAnswer
        );

        const numChoices = 4; // How many options to show (including correct)
        const neededWrongAnswers = numChoices - 1;

        if (potentialWrongAnswers.length < neededWrongAnswers) {
             console.warn(`Warning: Not enough unique wrong answers for difficulty ${currentDifficulty}. Some repetition might occur or fewer choices shown.`);
             // Adjust needed wrong answers if pool is too small
             neededWrongAnswers = potentialWrongAnswers.length;
        }

        const wrongAnswers = getRandomElements(potentialWrongAnswers, neededWrongAnswers);
        const wrongAnswerWords = wrongAnswers.map(item => item.word);

        // 5. Combine correct and incorrect, then shuffle
        currentChoices = [correctAnswer, ...wrongAnswerWords];
        shuffle(currentChoices);

        // 6. Create buttons for choices
        currentChoices.forEach(choiceWord => {
            const button = document.createElement('button');
            button.textContent = choiceWord;
            button.addEventListener('click', () => handleAnswer(choiceWord));
            choicesContainer.appendChild(button);
        });
    }

    // Handle user's answer selection
    function handleAnswer(selectedWord) {
        const buttons = choicesContainer.querySelectorAll('button');

        // === MODIFICATION START ===
        // Disable all buttons, but mark the selected one
        buttons.forEach(button => {
            button.disabled = true; // Disable all buttons
            if (button.textContent === selectedWord) {
                button.classList.add('selected-choice'); // Add class to the clicked button
            }
        });
        // === MODIFICATION END ===


        const correct = selectedWord === currentScene.match;
        const feedbackMsg = document.createElement('p'); // Use paragraph for better structure

        scores[currentDifficulty].attempts++;

        if (correct) {
            scores[currentDifficulty].correct++;
            const correctMeaning = onomatopoeiaData.find(o => o.word === currentScene.match)?.meanings.join(', ') || 'Correct meaning';
            feedbackMsg.innerHTML = `🌟 Correct! 「${selectedWord}」 often means: <em>${correctMeaning}</em>`;
            feedbackEl.className = 'feedback-correct feedback-show';
        } else {
            const correctWord = currentScene.match;
            const correctMeaning = onomatopoeiaData.find(o => o.word === correctWord)?.meanings.join(', ') || 'Correct meaning';
            feedbackMsg.innerHTML = `❌ Not quite! The answer was 「${correctWord}」 (Meaning: <em>${correctMeaning}</em>)`;
            feedbackEl.className = 'feedback-incorrect feedback-show';
            // Optional: You could add another class to the correct button if the user was wrong
            buttons.forEach(button => {
                if(button.textContent === correctWord) {
                    // button.classList.add('correct-answer-highlight'); // Add styling for this in CSS if desired
                }
            });
        }
        feedbackEl.innerHTML = ''; // Clear previous content
        feedbackEl.appendChild(feedbackMsg);

        saveResults();

        // Load next question after a delay
        setTimeout(() => {
            // No need to explicitly remove 'selected-choice' class here
            // because loadQuestion clears and recreates all buttons.
            loadQuestion();
        }, 2500); // 2.5 second delay
    }

    // Start the game function
    function startGame() {
        currentDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
        gameArea.classList.remove('hidden'); // Show the game area
        console.log(`Starting game with difficulty: ${currentDifficulty}`);
        loadQuestion();
    }

    // --- Event Listeners ---
    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetAllScores);
    // Optional: Change difficulty immediately resets game
    difficultyRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            // Only restart if game area is visible (avoids restarting on initial load)
            if (!gameArea.classList.contains('hidden')) {
                startGame();
            }
        });
    });


    // --- Initial Load ---
    loadResults(); // Load scores when page opens

}); // End DOMContentLoaded