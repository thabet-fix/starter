<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sd_contract_fields', function (Blueprint $table) {
            $table->id();
            $table->string('field')->nullable();
            $table->string('value')->nullable();
            $table->unsignedBigInteger('sdContractId')->nullable();
            $table->foreign('sdContractId')->references('id')->on('standard_contract');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sd_contract_fields');
    }
};
