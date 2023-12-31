<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{
    /**
     * Run the migrations.
     *php artisan migrate
     * @return void
     */
    public function up():void
    {
        Schema::create('db_category',function(Blueprint $table){
            $table->id();
            $table->string('name',1000);
            $table->string('slug',1000);
            $table->string('image')->nullable();
            $table->unsignedInteger('parent_id')->defaut(0);
            $table->unsignedInteger('sort_order')->defaut(0);
            $table->string('metekey');
            $table->string('metadesc');
            $table->timestamps(); 
            $table->unsignedInteger('create_by')->default(1);
            $table->unsignedInteger('update_by')->nullable();
            $table->unsignedTinyInteger('status')->default(2);
            
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('db_category');
    }
};
