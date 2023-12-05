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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('status')->nullable();
            $table->decimal('price',8,2)->nullable();
            $table->string('sessionId')->nullable();
            $table->unsignedBigInteger('userId')->nullable();
            $table->foreign('userId')->references('id')->on('users');
            $table->unsignedBigInteger('packId')->nullable();
            $table->timestamp('expiredIn')->nullable();
            $table->integer('contractNb')->nullable();
            $table->boolean('optionAi')->default(false);
            $table->foreign('packId')->references('id')->on('packs');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
