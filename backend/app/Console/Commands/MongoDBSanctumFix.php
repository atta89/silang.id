<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MongoDBSanctumFix extends Command
{

    protected $signature = 'fix:sanctum
                        {--rollback : Rollback the Sanctum fix}';

    protected $description = 'Fixes sanctum for MongoDB support';

    protected $mongo_model = 'MongoDB\Laravel\Eloquent\Model';

    protected $laravel_model = 'Illuminate\Database\Eloquent\Model';

    protected $sanctum_path = 'vendor/laravel/sanctum/src/';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        if (!$this->option('rollback')) {
            $this->fixFiles();
            $this->info("Sanctum Files have been fixed for MongoDB");
        } else {
            $this->rollbackFiles();
            $this->info("Sanctum Files have been rolled back for MongoDB");
        }
    }

    protected function fixFiles()
    {
        foreach (glob(base_path($this->sanctum_path) . '*.php') as $filename) {
            $file = file_get_contents($filename);
            file_put_contents($filename, str_replace($this->laravel_model, $this->mongo_model, $file));
        }
    }

    protected function rollbackFiles()
    {
        foreach (glob(base_path($this->sanctum_path) . '*.php') as $filename) {
            $file = file_get_contents($filename);
            file_put_contents($filename, str_replace($this->mongo_model, $this->laravel_model, $file));
        }
    }
}
