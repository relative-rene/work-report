import React, { Suspense } from 'react';
import LineChart from '../components/D3/LineChart';
import { useData } from '../hooks/useData';


const GettingStartedPage = () => {
    let { sets } = useData();

    return (
        <>
            <section className="getting-started_peel">
                <h3>Track Your Effort</h3>
                <p>
                    The mind is a fickle thing, some folks focus on the good, others dwell on the bad.
                    Regardless of your disposition there is a preference and in time there will be blind spots.
                    When we are commited to succeed, we cannot accept our error prone minds, we must document our effort.
                    This application was created to track your work effort in <b>Sets</b> and outcomes in <b>Stats</b>.
                    When you commit to logging your program, you will be rewarded with reports.
                    These reports will help you define your gains in physique and strength.
                </p>
                <h3>The Program</h3>
                <p>This will not be an innovative program. Work report Will take tried and true methods and use them.</p>
            </section>

            <section className="getting-started_peel">
                <h3>1. Progressive Overload</h3>
                <p>
                    Milo of Croton was an olympic champion in late 600 century BC. At the time, he was known for carrying a bull around town.
                    As the bull grew, so did Milo. This is the first documented case for progressive overload.
                    Their are many more examples of progressive overload, but this is my favorite. The ability to carry more weight overtime is sufficient evidence to know
                    that strength and hypertrophy has occured.
                    Unfortunately for us, we do not have a bull that will grow and increment our loads, so we must log our sets.
                    In time, Work Report will calculate your recommended sets and rep range. As you reach your bodies potential, Work Report will recommend
                    alternative exercises. Your feedback or personal awareness is vital to success. When choosing the exercises, you should forego any exercise that hurts your joints or doesn't directly stimulate the primary muscle.
                    We want the most stimulous and lease fatigue.
                    </p>

            </section>
            <section className="getting-started_peel">
                <h3>2. Specificity</h3>
                <p>The specificity principle states to become better at a particular exercise or skill, one should perform that exercise or skill.
                We will focus on specificity at three levels.
                Specifiity for strength, muscle gain and power.
                </p>

                <ul>
                    Mission Statements when we workout:
                    <li>We do full range of motion.</li>
                    <li>Slow controlled eccentric..</li>
                    <li>Pausing for a second or two at the end range</li>
                    <li>Explosive muscle focused concentric phase.</li>
                </ul>

                <ul>
                    Form Checklist:
                    <li>Before: Balance and align yourself in optimal starting position..</li>
                    <li>During: Focus or visualize the muscle being worked toward the direction of exertion. Queueing works.</li>
                    <li>After: Ease into full range. Pause, striking ideal pose. Reduce weight when you can't.</li>
                    <li>Remember to relax all muscles not being worked.</li>
                </ul>

            </section>
            <section className="getting-started_peel">
                <h3>3. Recovery</h3>
                <p>
                    Never do a workout unless you can give it your all.
                    Its better to take the day off if you don't have the energy.
                </p>
                <h5>Fatigue</h5>
                    <p> To understand recovery we must have a working knowledge of fatigue.
                    During an exercise the muscles being worked will tire or be unable to produce the same output.
                    This regional exhaustion is peripheral fatigue. When your body notices this it will recruit higher threshold fibers.
                    If we continue to exercise we eventually exhaust our central nervous system energy. At this point, our entire body is tired, not just the
                    muscles being stimulated. The goal of hypertrophy training is to exercise until our higher threshold fibers are worked and our body
                    triggers the growth process. Pushing too far beyound this point will prolong recovery time, and working out while exhausted will lead to injury.

                    <h5>Deload</h5>
                    From time to time Work Report will recommend a deload period.
                    A Deload period is a week when you barely exercise. You literally drop your weight and sets to 50% of work.
                    Deload periods allow your body to fully recover and adjust to its current weight and strength.
                    Deloads are not optional. Nothing hurts gains more than injury. If you are true to progressive overload,
                    you will be systematically adding weight to your lifts. Your continuous growth will cause general fatigue to linger.
                    Deloads should happen every six weeks, give our take a month depending on your exercises selection.
                    Work Report mainly recommends high stimulous low fatigue exercises, if you prefer to Deadlift, Squat and Overhead Press. They will make
                    you stronger but you will need more days to recover and more deload periods.
                </p>
                    <h5> Are you lazy or exhausted?</h5>
                If your good at ignoring your needs or just lack that mind body connection, you may want something other than feelings to tell you if when to rest.
                    <ul>
                        Your morning resting heart rate can help you determine if your body hasn't recovered.
                    <li>First establish a baseline heart rate first thing in morning.</li>
                        <li>If your heart rate is higher than normal take the day off.
                        This can be a hard line of higher than 15% increase or
                    just higher than average and not feeling it.</li>
                    </ul>

                    <h5> Active Recovery</h5>
                    <li>Going for a walk 30 minute or job can help recover.</li>
                    <p> 5x 6 minute run or 3x10 minute run with 1 min rest should suffice.</p>
                    <ul>Progressive Relaxation:  is also another recommended way to relax.
                        <li>You basically flex a muslce for six seconds and relax it for 3 breaths.</li>
                        <li>For instance you start with your calves.</li>
                        <li>Start in a laying or upright sitting position.</li>
                        <li>Tense shins by pointing toes toward your head for six seconds.</li>
                        <li>Relax breathe for 3 breaths, while imagining your shin muscles relaxing.</li>
                        <li>Their warm and heavy just weiging into the gound fully supported.</li>
                        <li>Than you tense your calves, point toes down away from head for six seconds.</li>
                    </ul>
                    <p> With the process in mind, you make your way up your body.
                        Tensing and relaxing every muscle.
                        This is a great before bed routine.
                        Shaking the muscle out or mimicing the lift sans weight also has a
                        relaxing affect.
                    </p>
            </section>
                <section className="getting-started_peel">
                    <h3>4. Diet</h3>
                    <p>What to eat is a big topic and their are many ways of living.</p>
                    <h5>Calories</h5>
                    <ul>
                        The scientific literature on this topic is pretty clear.
                        <li>Crash dieting is unsustainable and can cause adverse affects on the body, so it should be avoided.</li>
                        <li>Ideally you should calculate your maintenence calories and increase or decrease your intake depending on goals.</li>
                    </ul>
                    <p>
                        If you want to lose a 1lb a week, reduce calories by 250 calories a day, or 500 calories if you want to lose 2 lbs a week.
                        If you want to gain muscle increase by 250 to 500 calories.
                        You can loose more by reducing more but it is not sustainable and your more likely to fail the diet,
                        so why do something that reduces your chances of success and hurts your body in the long term?!?! <br />
                        Lastly, you cannot gain more muscle by eating more. Bulking should only be reserved for elite body builders.
                        The fact is building muscle takes time and people dirty bulk to lie to themselves that their growing muscle, when in reality they are mainly growing fat.
                        Counting calories seems like a lot of work and it is but in time you'll get an understanding on how much food you should be eating and it gets easier. <br />
                        The work report recommendation is the portion control approach and avoid bad calories.
                        The main things to avoid are liquid calories and flour.
                        Sugar water is just bad for you and should be avoided at all cost.
                        The main reason against flour is because its easy to eat a lot of and not feel satiated.
                        Meat and fibrous legumes will fill you up, so sure you can eat a lot but your body will eventually demand you stop.
                        </p>

                    <h5>Breakfast</h5>
                    <p>
                        Eat as many eggs and cheese as you want, a slice of bread or fruit.
                        Oats and smoothies are also a great idea.
                </p>
                    <h5>Lunch</h5>
                    <p>
                        Eat as much meat and veggies as you want.
                        Eat very little to know carbs, unless your a vegetarian.
                 </p>
                    <h5>Dinner</h5>
                    <p>
                        Eat as much meat and veggies as you want.
                        Carbs are limited to two palm fulls.

                        If your trying to lose weight and this isn't working out, cut more carbs and eat less meat.
                        Also, going for a 30+ minute walk after workouts will help.

                        If your trying to gain weight and this isn't working out, eat more meats and veggies.
                </p>
                </section>
                <section className="getting-started_peel">
                    <h3>5. In the Beginning</h3>
                    <p>If your excited to get started, the first step is to create an account.
                    Once that is created, you will have access to our logging platform.
                    Pay extra attention to the Sidebar were you will find our Kaizen section.
                    Kaizen is a term that defines a philosophy of incremental progress.
                    You will better know it as a todo list. Complete the task and prosper.
            </p>

                </section>
                <section width="100%" height="100%">
                    <Suspense fallback={<h2>...Loading</h2>}>
                        <LineChart svgHeight={500} svgWidth={960} data={sets} />
                    </Suspense>
                </section>
        </>
    )
}

export default GettingStartedPage;