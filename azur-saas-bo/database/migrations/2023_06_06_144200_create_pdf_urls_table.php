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
        Schema::create('pdf_urls', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->unsignedBigInteger('contractId')->nullable();
            $table->foreign('contractId')->references('id')->on('standard_contract');
            $table->unsignedBigInteger('langId')->nullable();
            $table->foreign('langId')->references('id')->on('languages');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pdf_urls');
    }
};
