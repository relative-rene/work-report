import React, { useMemo } from 'react';
import LineChart from '../components/D3/LineChart';
import { useOutletContext } from 'react-router-dom';


const GettingStartedPage = () => {
    let { exercises, allSets } = useOutletContext();
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
                    As the bull grew, so did Milo. This is the first documented history of progressive overload.
                    In short, when you declare your goal and log your sets.
                    The application will recommend exercises and calculate your recommended set and rep range.
                    From time to time it will also recommend a deload period. Nothing hurts gains more than injury.
                    Deload periods is a week when you barely exercise. You literally drop your weight and sets to 50% of work.
                    Deload periods allow your body to fully recover and adjust to its current weight and strength.


                    </p>

            </section>
            <section className="getting-started_peel">
                <h3>2. Specificity</h3>
                <p>The specificity principle states to become better at a particular exercise or skill, one should perform that exercise or skill.
                We will focus on specificity at three levels.
                Specifiity for strength, muscle gain and power.

                Mission Statements when we workout:
                a. We do full range of motion.
                b. Slow controlled eccentric.
                c. Pausing for a second or two at the end range.
                d. Explosive muscle focused concentric phase.

                Form Checklist
                a. Before: Balance and align yourself in optimal starting position.
                b. During: Focus or visualize the muscle being worked toward the direction of exertion. Queueing works.
                c. After: Ease into full range. Pause, striking ideal pose. Reduce weight when you can't.
                d. Remember to relax all muscles not being worked.
                </p>

            </section>
            <section className="getting-started_peel">
                <h3>3. Recovery</h3>
                <p>
                    Never do a workout unless you can give it your all.
                    Its better to take the day off if you don't have the energy.

                    The morning resting heart rate can help you determine if your body hasn't recovered.
                    1. First establish a baseline on first thing in morning awaking heart rate.
                    2. If your heart rate is higher than normal take the day off.
                    This can be a hard line of higher than 15% increase or
                    just higher than average and not feeling it.
                    3. Going for a walk 30 minute or job can help recover.
                    5x 6 minute run or 3x10 minute run with 1 min rest should suffice.
                    Progressive Relaxation is also another recommended way to relax.
                    Its a way to actively relax your muscles.
                    You basically flex a muslce for six seconds and relax it for 3 breaths.
                    For instance you start with your calves.
                    Start in a laying or upright sitting position.
                    Tense shins by pointing toes toward your head for six seconds.
                    Relax breathe for 3 breaths, while imagining your shin muscles relaxing.
                    Their warm and heavy just weiging into the gound fully supported.
                    Than you tense your calves, point toes down away from head for six seconds.
                    With the process in mind, you make your way up your body.
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

                <h5>
                    Breakfast
                        </h5>
                <p>
                    Eat as many eggs and cheese as you want, a slice of bread or fruit.
                    Oats and smoothies are also a great idea.
                            </p>
                <h5>
                    Lunch
                        </h5>
                <p>
                    Eat as much meat and veggies as you want.
                    Eat very little to know carbs, unless your a vegetarian.
                           </p>
                <h5>
                    Dinner
                        </h5>
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
                {allSets.length ? <LineChart svgHeight={500} svgWidth={960} data={allSets} /> : "...Loading"}
            </section>
        </>
    )
}

export default GettingStartedPage;