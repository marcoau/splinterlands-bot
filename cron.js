const schedule = require('node-schedule');
const { spawn } = require('child_process');

// CHANGE THIS TO YOUR OWN ACCOUNTS
const ACCOUNTS = [
  {
    username: 'testing1',
    password: '12345678',
    runAtMinute: 0,
  },
  {
    username: 'testing2',
    password: '12345678',
    runAtMinute: 30,
  },
  {
    username: 'testing3',
    password: '12345678',
    runAtMinute: 60,
  },
];

(async function () {
  try {
    ACCOUNTS.forEach((acc) => {
      const rule = new schedule.RecurrenceRule();
      rule.minute = acc.runAtMinute;

      schedule.scheduleJob(rule, () => {
        console.log(`${acc.username} - run bot`);
        const proc = spawn('npm', ['start'], { env: {
          ...process.env,
          ACCOUNT: acc.username,
          PASSWORD: acc.password,
        }});

        proc.stdout.on('data', (data) => {
          console.log(`${acc.username} - log: ${data}`);
        });
        proc.stderr.on('data', (data) => {
          console.log(`${acc.username} - error: ${data}`);
        });
      });

      console.log(`${acc.username} - schedule to run at minute ${acc.runAtMinute}`);
    });
  } catch (err) {
    console.error('There was an error: ', err);
  }
}());
