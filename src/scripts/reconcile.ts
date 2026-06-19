import {
  reconciliationService
} from '../services/reconciliation.service';

async function run() {
  await reconciliationService.run();

  console.log(
    'reconciliation completed'
  );
}

run();